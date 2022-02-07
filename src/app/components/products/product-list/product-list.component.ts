import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductsService,
    public cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((r) => {
      this.products = r;
      console.log(r);
    });
  }

  addProduct(productId: number) {
    const productToAdd = this.products.find((p) => p.id == productId)!;
    this.cartService.addSingleProductToCart(productToAdd);
  }

  removeProduct(productId: number) {
    const productToRemove = this.products.find((p) => p.id == productId)!;
    this.cartService.removeSingleProductFromCart(productToRemove);
  }
}
