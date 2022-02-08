import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { createProductsMockData } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/interfaces';

import { CartComponent } from './cart.component';

describe('CartComponent', () => {
  let component: CartComponent;
  let fixture: ComponentFixture<CartComponent>;

  let cartServiceSpy: jasmine.SpyObj<CartService>;

  const PRODUCTS = createProductsMockData();

  beforeEach(async () => {
    // Create spy
    cartServiceSpy = jasmine.createSpyObj(
      'cartService',
      ['getQuantityInCart', 'incrementQuantity', 'decrementQuantity'],
      { evtCartChange: of([]) }
    );

    await TestBed.configureTestingModule({
      declarations: [CartComponent],
      providers: [{ provide: CartService, useValue: cartServiceSpy }],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('On init', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });

  it('incrementQuantity() should call cartService.incrementQuantity() with the product id', () => {
    // Setup
    const productToAdd = PRODUCTS[0];

    // Execution
    component.incrementQuantity(productToAdd.id);

    // Assertion
    expect(cartServiceSpy.incrementQuantity).toHaveBeenCalledWith(
      productToAdd.id
    );
  });

  it('decrementQuantity() should call cartService.decrementQuantity() with the product id', () => {
    // Setup
    const productToRemove = PRODUCTS[0];

    // Execution
    component.decrementQuantity(productToRemove.id);

    // Assertion
    expect(cartServiceSpy.decrementQuantity).toHaveBeenCalledWith(
      productToRemove.id
    );
  });
});
