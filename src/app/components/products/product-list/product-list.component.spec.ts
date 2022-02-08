import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import {
  createProductsMockData,
  ProductsService,
} from 'src/app/services/products.service';

import { ProductListComponent } from './product-list.component';

describe('ProductListComponent', () => {
  let component: ProductListComponent;
  let fixture: ComponentFixture<ProductListComponent>;

  let productServiceSpy: jasmine.SpyObj<ProductsService>;
  let cartServiceSpy: jasmine.SpyObj<CartService>;

  const PRODUCTS = createProductsMockData();

  beforeEach(async () => {
    // Create spy
    productServiceSpy = jasmine.createSpyObj('productService', ['getProducts']);
    // Make the method return a mock data
    productServiceSpy.getProducts.and.returnValue(of(PRODUCTS));

    cartServiceSpy = jasmine.createSpyObj('cartService', [
      'getQuantityInCart',
      'addSingleProductToCart',
      'removeSingleProductFromCart',
    ]);
    cartServiceSpy.getQuantityInCart.and.returnValue(0);

    // Configure the testbed
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent],
      providers: [
        // Provide jasmine spy as a mock service to inject
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: CartService, useValue: cartServiceSpy },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    // Assign variables
    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;

    // Launch lifecycle
    fixture.detectChanges();
  });

  describe('On init', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should call productService.getProducts()', () => {
      expect(productServiceSpy.getProducts).toHaveBeenCalled();
    });

    it('should have the products assigned', () => {
      expect(component.products).toBe(PRODUCTS);
    });
  });

  it("addProduct() should call cartService.addSingleProductToCart() with the product from the component's product list", () => {
    // Setup
    const productToAdd = PRODUCTS[0];

    // Execution
    component.addProduct(productToAdd.id);

    // Assertion
    expect(cartServiceSpy.addSingleProductToCart).toHaveBeenCalledWith(
      productToAdd
    );
  });

  it("removeProduct() should call cartService.removeSingleProductFromCart() with the product from the component's product list", () => {
    // Setup
    const productToRemove = PRODUCTS[0];

    // Execution
    component.removeProduct(productToRemove.id);

    // Assertion
    expect(cartServiceSpy.removeSingleProductFromCart).toHaveBeenCalledWith(
      productToRemove
    );
  });
});
