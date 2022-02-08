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
    private readonly productService: ProductsService,
    public readonly cartService: CartService
  ) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((r) => {
      this.products = r;
    });
  }

  /** Looks up a product from its id and adds it to the cart */
  addProduct(productId: number) {
    // Look up the product
    const productToAdd = this.products.find((p) => p.id == productId)!;

    // Add
    this.cartService.addSingleProductToCart(productToAdd);
  }

  /** Looks up a product from its id and removes it from the cart */
  removeProduct(productId: number) {
    // Look up the product
    const productToRemove = this.products.find((p) => p.id == productId)!;

    // Remove
    this.cartService.removeSingleProductFromCart(productToRemove);
  }
}
