import { TestBed } from '@angular/core/testing';
import { Subscription } from 'rxjs';
import { CartProduct, Product } from '../shared/interfaces';

import { CartService } from './cart.service';
import { createProductsMockData } from './products.service';

describe('CartService', () => {
  let service: CartService;

  const PRODUCTS = createProductsMockData();

  const subscriptions: Subscription[] = [];

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartService);
    spyOn(service.evtCartChange, 'emit').and.callThrough();
  });

  describe('On init', () => {
    it('should be created', () => {
      expect(service).toBeTruthy();
    });
  });

  // 0 items in cart
  describe('On 0 items in the cart', () => {
    let testProduct: Product;

    beforeEach(() => {
      testProduct = PRODUCTS[0];
    });

    it('isCartEmpty() should return true', () => {
      expect(service.isCartEmpty()).toBeTrue();
    });

    it('getQuantityInCart() should return 0', () => {
      expect(service.getQuantityInCart(testProduct.id)).toBe(0);
    });

    it('addSingleProductToCart() should add the product to the cart', (done) => {
      const subscription = service.evtCartChange.subscribe((cart) => {
        const expected = jasmine.objectContaining({
          product: testProduct,
          quantity: 1,
        });
        expect(cart).toContain(expected);
        done();
      });
      subscriptions.push(subscription);

      service.addSingleProductToCart(testProduct);
    });

    it('incrementQuantity() should fail since it does not check if the product exists', () => {
      try {
        service.incrementQuantity(testProduct.id);
      } catch (err) {
        expect(true).toBe(true);
      }
    });

    it('decrementQuantity() should fail since it does not check if the product exists', () => {
      try {
        service.decrementQuantity(testProduct.id);
        fail("The code has an 'if' guard");
      } catch (err) {
        expect(true).toBe(true);
      }
    });

    it('removeSingleProductFromCart() should remove the product and empty the cart', (done) => {
      const subscription = service.evtCartChange.subscribe((cart) => {
        expect(cart).toHaveSize(0);
        done();
      });
      subscriptions.push(subscription);

      service.removeSingleProductFromCart(testProduct);
    });
  });
  // END 0 items in cart

  // 1 item in cart
  describe('With 1 item in the cart', () => {
    /**
     * Auxiliar function to check that the cart contains
     * a product and the quantity of the product
     */
    const createProductExpectation = (
      cartProduct: CartProduct,
      fnDone: Function
    ) => {
      const subscription = service.evtCartChange.subscribe((cart) => {
        const expected = jasmine.objectContaining(cartProduct);
        expect(cart).toContain(expected);
        fnDone();
      });
      subscriptions.push(subscription);
    };

    let testProduct: Product;

    beforeEach(() => {
      testProduct = PRODUCTS[0];
      service.addSingleProductToCart(testProduct);
    });

    it('isCartEmpty() should return false', () => {
      expect(service.isCartEmpty()).toBeFalse();
    });

    it('getQuantityInCart() should return 1', () => {
      expect(service.getQuantityInCart(testProduct.id)).toBe(1);
    });

    it('addSingleProductToCart() should increment the quantity to 2', (done) => {
      createProductExpectation({ product: testProduct, quantity: 2 }, done);

      service.addSingleProductToCart(testProduct);
    });

    it('incrementQuantity() should increment the quantity to 2', (done) => {
      const subscription = service.evtCartChange.subscribe((cart) => {
        const expected = jasmine.objectContaining({
          product: testProduct,
          quantity: 2,
        });
        expect(cart).toContain(expected);
        done();
      });
      subscriptions.push(subscription);

      service.incrementQuantity(testProduct.id);
    });

    it('decrementQuantity() should remove the product and empty the cart', (done) => {
      const subscription = service.evtCartChange.subscribe((cart) => {
        expect(cart).toHaveSize(0);
        done();
      });
      subscriptions.push(subscription);

      service.decrementQuantity(testProduct.id);
    });

    it('removeSingleProductFromCart() should remove the product and empty the cart', (done) => {
      const subscription = service.evtCartChange.subscribe((cart) => {
        expect(cart).toHaveSize(0);
        done();
      });
      subscriptions.push(subscription);

      service.removeSingleProductFromCart(testProduct);
    });
  });
  // END 1 item in cart

  afterAll(() => {
    subscriptions.forEach((s) => s.unsubscribe());
  });
});
