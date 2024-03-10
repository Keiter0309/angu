import { Component } from '@angular/core';
import { ProductService } from '../product.service';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { Cart } from '../cart';
import { CartService } from '../cart.service';
import { Product } from '../product';

@Component({
  selector: 'app-shop-single',
  templateUrl: './shop-single.component.html',
  styleUrls: ['./shop-single.component.css']
})
export class ShopSingleComponent {
  productdetail : Product| undefined;
  //danh sách sản phẩm trong giỏ hàng
  CartList : Cart[] =[];
  //số lượng sản phẩm
  InStock:number = 1;
  
  constructor(
    private router: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}//phương thức được khỏi tạo khi component được khỏibtaoj
   
  ngOnInit(): void {
    // Get product ID from URL
    let id = Number(this.router.snapshot.params['id']);

    // Get product details based on ID
    this.productService.getProducId(id).subscribe(data => {
      this.productdetail = data;

      // Get the available product quantity
      // This line is moved inside the subscribe callback to ensure it's executed after productdetail is defined
      this.InStock = this.productdetail?.InStock!;
    });
  }
  ItemCount(){
    return this.cartService.totalItems()
  }
  //phương thức được thêm vào giỏ hàng
  Add() {
    this.cartService.addCart(this.productdetail?.id!, this.productdetail);
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