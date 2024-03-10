import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ResComponent } from './auth/res/res.component';
import { ShopComponent } from './shop/shop.component';
import { AppComponent } from './app.component';
import { ShopSingleComponent } from './shop-single/shop-single.component';
import { SuccessComponent } from './success/success.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';


const routes: Routes = [
  {path:"",component:HomeComponent,title:"Trang Chủ"},
  {path:"sanpham",component:ProductComponent,title:"Sản Phẩm"},
  {path:"contact",component:ContactComponent,title:"Liên Hệ"},
  {path:"cart",component:CartComponent,title:"Giỏ Hàng"},
  {path:"checkout",component:CheckoutComponent,title:"Thanh Toán"},
  {path:"product-details/:id",component:ProductDetailComponent,title:"Chi tiết sản phẩm"},
  {path:"login",component:LoginComponent,title:"Đăng Nhập"},
  {path:"dangki",component:ResComponent,title:"Đăng Kí"},
  {path:"shop",component:ShopComponent,title:"Shop"},
  {path:"shop-single/:id", component:ShopSingleComponent, title:"Shop Single"},
  {path: 'success', component: SuccessComponent, title: 'Success' },
  {path: 'about', component: AboutComponent, title: 'About'},
  {path: 'admin', component: AdminComponent, title: 'Admin'}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  
  exports: [RouterModule]
})
export class AppRoutingModule { }
