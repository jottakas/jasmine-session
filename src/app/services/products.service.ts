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

export const createProductsMockData = () =>
  Array(10)
    .fill(0)
    .map((_v, idx) => ({
      id: idx + 1,
      name: `Product number ${idx + 1}`,
      description: Utils.getLoremIpsumRandom(),
    }));

const PRODUCTS: Product[] = createProductsMockData();
