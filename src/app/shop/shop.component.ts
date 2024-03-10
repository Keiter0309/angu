import { Component, inject } from '@angular/core';
import { Product } from '../product';
import { ProductService } from '../product.service';
import { CartService } from '../cart.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {
  products: Product[] = [];
  productservices: ProductService = inject(ProductService);
  productdetail : Product| undefined;
  InStock:number = 0;
  constructor(
    private cartService: CartService
    ) {
    this.productservices.getAllProdutList().subscribe(data=>{
      this.products =data
    })
   }
   ItemCount(){
    return this.cartService.totalItems()
  }
   Add(id:number) {
   console.log(id);
   // Find the product with the given id
   this.productdetail = this.products.find(product => product.id === id);

   // Check if the product is found
   if (this.productdetail) {
     // Call the addCart method with the found product
     this.cartService.addCart(id, this.productdetail);
     console.log(this.cartService);
     this.InStock = this.cartService.getInStock(this.productdetail?.id!)!;
     const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      }
    });
    Toast.fire({
      icon: "success",
      title: "Thêm Vào Giỏ Hàng Thành Công"
    });
   }
  }
}
