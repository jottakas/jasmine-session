import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { CartProduct } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styles: [],
})
export class CartComponent implements OnInit {
  cartProducts: CartProduct[] = [];
  cartSubscription$!: Subscription;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartSubscription$ = this.cartService.evtCartChange.subscribe(
      (cartProducts) => (this.cartProducts = cartProducts)
    );
  }

  ngOnDestroy() {
    this.cartSubscription$.unsubscribe();
  }

  incrementQuantity(productId: number) {
    this.cartService.incrementQuantity(productId);
  }

  decrementQuantity(productId: number) {
    this.cartService.decrementQuantity(productId);
  }
}
