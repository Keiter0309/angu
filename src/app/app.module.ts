import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ProductComponent } from './product/product.component';
import { ContactComponent } from './contact/contact.component';
import { CartComponent } from './cart/cart.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import {  FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './auth/login/login.component';
import { ResComponent } from './auth/res/res.component';
import { ShopComponent } from './shop/shop.component';
import { ShopSingleComponent } from './shop-single/shop-single.component';
import { SuccessComponent } from './success/success.component';
import { AboutComponent } from './about/about.component';
import { AdminComponent } from './admin/admin.component';




@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductComponent,
    ContactComponent,
    CartComponent,
    CheckoutComponent,
    LoginComponent,
    ProductDetailComponent,
    ResComponent,
    ShopComponent,
    ShopSingleComponent,
    SuccessComponent,
    AboutComponent,
    AdminComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
