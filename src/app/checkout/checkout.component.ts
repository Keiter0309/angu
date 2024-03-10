import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Cart } from '../cart';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {
  cartList: Cart[] = [];

  constructor(
    private cartService: CartService,
    private http: HttpClient,
  ) {
    
  }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartAll();
    this.cartService.TotalInCart();
    if(this.cartList.length > 0){
      this.getCartItems(this.cartList[0]);
    }
  }

  getCartItems(item: Cart) {
    this.http.get('http://localhost:3000/cart').subscribe((res) => {
      console.log(res);
    });
  }

  TotalPrice() {
    return this.cartService.Total();
  }

}
