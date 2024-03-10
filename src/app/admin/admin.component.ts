import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  users: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getAllUserList().subscribe((users) => {
      this.users = users;
    });
  }

  // deleteUser(id: number) {
  //   this.authService.deleteUser(id).subscribe(() => {
  //     this.users = this.users.filter(user => user.id !== id);
  //   });
  // }
}
