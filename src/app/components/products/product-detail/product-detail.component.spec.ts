import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { createProductsMockData } from 'src/app/services/products.service';

import { ProductDetailComponent } from './product-detail.component';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;

  const classBtnAdd = 'btn-add-to-cart';
  const classBtnRemove = 'btn-remove-from-cart';

  let btnAdd: DebugElement;
  let spyEvtAdd: jasmine.Spy;

  const productTest = createProductsMockData()[0];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;

    // Setup: without product the component does not work right
    component.product = productTest;

    // Launch angular lifecycle and update/render the html
    fixture.detectChanges();

    // Get the add button
    btnAdd = fixture.debugElement.query(By.css(`.${classBtnAdd}`));

    // Spy on the add event to check if it's fired
    spyEvtAdd = spyOn(component.evtAdd, 'emit');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit event evtAdd on click', () => {
    // Create a click event and fire it
    const event = new Event('click');
    btnAdd.nativeElement.dispatchEvent(event);

    // Check if the associated component event is fired
    expect(spyEvtAdd).toHaveBeenCalledWith(productTest.id);
  });

  describe('With an item already added to the cart', () => {
    let btnRemove: DebugElement;
    let spyEvtRemove: jasmine.Spy;

    beforeEach(() => {
      component.quantityInCart = 1;
      fixture.detectChanges();

      btnRemove = fixture.debugElement.query(By.css(`.${classBtnRemove}`));
      spyEvtRemove = spyOn(component.evtRemove, 'emit');
    });

    it('should display a remove button', () => {
      expect(btnRemove).toBeTruthy();
    });

    it('should display the quantity in the cart', () => {
      const quantity: string = fixture.debugElement.query(By.css(`span.quantity`)).nativeElement.innerText;
      expect(quantity.trim()).toBe('1');
    });

    it('should emit event evtRemove on click', () => {
      // Create a click event and fire it
      const event = new Event('click');
      btnRemove.nativeElement.dispatchEvent(event);

      // Check if the associated component event is fired
      expect(spyEvtRemove).toHaveBeenCalledWith(productTest.id);
    });
  });
});
