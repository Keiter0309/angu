import { Injectable } from '@angular/core';
import { Cart } from './cart';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  protected cartList:Cart[] =[]
  constructor(
    private prod:ProductService,
    private router:Router,
    private authService: AuthService
    ) { 
    this.loadCart();
    }
  
  getCartAll(){
    return this.cartList
  }
  getInStock(id:number){
    return this.cartList.find(i=>i.Id === id)?.InStock
  }

  loadCart() {
    const cart = localStorage.getItem('cart');
    if (cart) {
      this.cartList = JSON.parse(cart);
    }
  }
  saveCart() {
    localStorage.setItem('cart', JSON.stringify(this.cartList));
  }
  addCart(index:number, frmProdut:any){
    let iteminCart=this.cartList.filter(i=>i.Id==index)
    let isItemInCart=iteminCart.length > 0
    if (isItemInCart==false) {
      let id=this.cartList.push({
        "Id":frmProdut.id,
        "Name":frmProdut.productName,
        "Price":frmProdut.price,
        "Des":frmProdut.description,
        "InStock":frmProdut.InStock,
        "Quantity":0,
        "ImageUrl":frmProdut.imageUrl,
        "TotalPrice": frmProdut.price 
      })-1
      this.cartList[id].Quantity=this.cartList[id].Quantity!+1
      this.cartList[id].InStock=this.cartList[id].InStock!-1
      console.log(this.cartList[id].Quantity);
      console.log(this.cartList[id].InStock);
    }else{
      for (let i = 0; i < this.cartList.length; i++) {
       if (this.cartList[i].Id==index) {
        this.cartList[i].Quantity=this.cartList[i].Quantity!+1
        this.cartList[i].InStock=this.cartList[i].InStock!-1
      console.log(this.cartList[i].Quantity);
      console.log( this.cartList[i].InStock);

       }
        
      }
    }
  }
  
  totalItems(){
    let sum=0;
    this.cartList.forEach(item=>{
      sum+=item.Quantity!;
    })
    return sum
  }
  Total(){
    let total =0 ;
    this.cartList.forEach(item=>{
      total+=(item.Price!*item?.Quantity!);
    })
    console.log(this.cartList);
    return total;
  }
  RemoveItemInCart(item: Cart) {
    const index = this.cartList.indexOf(item);
    if (index > -1) {
      this.cartList.splice(index, 1);
    }
    this.saveCart();
  }
 TotalInCart(){
  this.cartList.forEach(item => {
    item.TotalPrice = item.Price! * item.Quantity!;
  });
 }
  updateTotalPrice(item: Cart) {
    if (item.Quantity !== undefined && item.Price !== undefined) {
      item.TotalPrice = item.Price * item.Quantity;
    }
  }
  isAuthenticated() {
    return this.authService.isAuthenticated
  }
  CheckLogin(){
      if (this.isAuthenticated()==true) {
        this.router.navigate(["/checkout"]);
      }else{
        Swal.fire({
          title: "Bạn Chưa Đăng Nhập?",
          text: "Vui Lòng Đăng Nhập",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!"
        }).then((result) => {
          if (result.isConfirmed) {
            this.router.navigate(["/login"]);
          }
        });
        
      }
  }
}
