import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styles: [
  ]
})
export class ProductDetailComponent implements OnInit {

  @Input() product!: Product;
  @Input() quantityInCart: number = 0;

  @Output() evtAdd: EventEmitter<number> = new EventEmitter();
  @Output() evtRemove: EventEmitter<number> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

}
