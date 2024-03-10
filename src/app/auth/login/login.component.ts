import { Component } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login:any []=[];

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private authService: AuthService, private router: Router) { 
    this.authService.getAllUserList().subscribe(data=>{
      this.login = data
    })
  }

  submit() {
    const email = this.loginForm.value.email;
    const password = this.loginForm.value.password;

    if (email && password) {
      this.authService.login(email, password).subscribe(isValid => {
        if (isValid) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Đăng Nhập Thành Công",
            showConfirmButton: false,
            timer: 1500
          });
          if (this.authService.isAdmin()) {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/']);
          }
        } else {
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Sai Email Hoặc Mật Khẩu",
            showConfirmButton: false,
            timer: 1500
          });
        }
      });
    } else {
      console.log("Vui lòng nhập email và mật khẩu!");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Vui lòng nhập email và mật khẩu!",
        showConfirmButton: false,
        timer: 1500
      });
    }
  }
}
  