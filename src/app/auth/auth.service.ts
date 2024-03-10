import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { LoginForm } from './auth';
import {HttpClient} from '@angular/common/http'
import { Observable, catchError, map, of, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isAuthenticated: boolean = false;
  isLoading: boolean = false;

  constructor(
    private http:HttpClient,
    private router:Router
    ) { }
  private URL=`http://localhost:3000/users`;

  Users: LoginForm [] = [
    
  ];
  Auto(){
    var max=1;
    this.Users.forEach(item=>{
      if (item.id>max) {
        max=item.id;
      }
    })
    return max +1
  }
getAllUserList() :Observable <LoginForm[]>{
  return this.http.get<LoginForm[]>(`${this.URL}`)
}
login(email: string, password: string) {
  return this.http.post<{token: string, role: string}>('http://localhost:3000/users', {email, password})
    .pipe(tap(response => {
      console.log('Login response:', response);
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
    }), catchError(error => {
      console.error('Login error:', error);
      return throwError(error);
    }));
}

register(email :string ,password :string ,ho:string,ten:string,sdt:string){
  return this.getAllUserList().pipe(
    map(users => {
      const user = users.find(i => i.email === email);
      if (!user) {
        const newUser: LoginForm = {
          email: email,
          password: password,
          ho: ho,
          ten: ten,
          sdt: sdt,
          id: this.Auto(),
          role: 'admin'
        };
        localStorage.setItem('role', 'admin');
        // Send the new user to the server
        return this.http.post('http://localhost:3000/users', newUser).pipe(
          tap(() => {
            this.Users.push(newUser);
          })
        );
      } else {
        return of(false);
      }
    })
  )
}
logout(){
  this.router.navigate([""]);
  this.isAuthenticated=false;
}
private updateUserList(): Observable<any> {
  // Sử dụng phương thức PUT hoặc POST tùy thuộc vào yêu cầu của server
  // Ví dụ sử dụng phương thức PUT:
  // return this.http.put(this.URL, {users: this.Users });
  // Hoặc sử dụng phương thức POST:
  return this.http.post(this.URL, { users: this.Users });
}

isAdmin() {
  return localStorage.getItem('role') === 'admin';
}
}
function throwError(error: any): any {
  throw new Error('Function not implemented.');
}

