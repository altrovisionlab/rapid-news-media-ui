import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  currentUser = new User();

  constructor(private authSerive: AuthService) { }

  ngOnInit(): void {
    this.currentUser = this.authSerive.authUser;
  }

}
