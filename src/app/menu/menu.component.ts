import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/security/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  username: string;
  password: string;
  displayRegister: boolean = false;
  newUser: User = new User();

  constructor(public authService : AuthService, private router: Router) { }

  ngOnInit(): void {
    console.log("Rendered the menu");
  }

  signIn() {
    this.authService.login(this.username, this.password);

  }

  signUp() {
    this.authService.registerUser(this.newUser);
    this.newUser = new User();
    this.displayRegister = false;
  }

  signOut() {
    this.authService.logout();
    this.router.navigateByUrl('/');
  }

  

    showDialog() {
        this.displayRegister = true;
    }

    goToMyAccount(){
      this.router.navigate([`/my-account`]);
    }

}
