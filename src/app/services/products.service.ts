import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';
import { Product } from '../shared/interfaces';
import { Utils } from '../shared/utils/utils';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor() {}

  getProducts() {
    // return of(PRODUCTS).pipe(delay(1000));
    return of(PRODUCTS);
  }
}

const PRODUCTS: Product[] = Array(10)
  .fill(0)
  .map((_v, idx) => ({
    id: idx,
    name: `Product number ${idx + 1}`,
    description: Utils.getLoremIpsumRandom(),
  }));
