import { Component, OnInit } from '@angular/core';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartList: Cart[] = [];

  constructor(
    private cartService: CartService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.cartList = this.cartService.getCartAll();
    this.cartService.TotalInCart();
    this.pushCartItem(this.cartList[0]);
  }

  TotalPrice() {
    return this.cartService.Total();
  }

  increaseQuantity(item: Cart) {
    if (item.Quantity !== undefined) {
      item.Quantity++;
      this.cartService.updateTotalPrice(item);
      this.cartService.saveCart();
      Swal.fire({
        title: "",
        text: "Cập Nhật Thành Công",
        icon: "success",
      });
    }
  }

  pushCartItem(item: Cart) {
    this.http.post('http://localhost:3000/cart', item).subscribe((res) => {
      console.log(res);
    });
  }

  decreaseQuantity(item: Cart) {
    if (item.Quantity !== undefined && item.Quantity > 1) {
      item.Quantity--;
      this.cartService.updateTotalPrice(item);
      this.cartService.saveCart();
      Swal.fire({
        title: "",
        text: "Cập Nhật Thành Công",
        icon: "success",
      });
    }
  }

  removeItem(item: Cart) {
    this.cartService.RemoveItemInCart(item);
    this.cartService.saveCart();
    Swal.fire({
      title: "",
      text: "Xóa Thành Công",
      icon: "success",
    });
  }
}