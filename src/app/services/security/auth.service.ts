import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from 'src/app/models/user';
import { CommonApiService } from '../common-api.service';
import { StorageService } from '../storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _authApiUri: string = this.commonApi.AUTH_API_URL;
  private _baseApiUri: string = this.commonApi.BASE_AUTH_API_URL;

  isAuthenticated = false;
  authUser : any;
  authToken: string;

  constructor(
    private http: HttpClient,
    private commonApi: CommonApiService,
    private storageService : StorageService
  ) { 
    this.authUser = this.storageService.get('authUser').subscribe(
      item => {
        if( item!= undefined && item.id){
          this.isAuthenticated = true;
          this.authUser = item;
          this.authToken = item.token;
        }
      }
    );
  }

  login(username: string, password: string){
    this.http.post(this._authApiUri + "/login", {"username": username, "password": password}).subscribe(
      response => {
        console.log("Successfully authenticated!");
        this.isAuthenticated = true;
        this.authUser = response;
        this.authToken = response["authToken"];
        this.storageService.set('authUser', this.authUser).subscribe();

      }
    );
  }

  registerUser(newUser: User) {
    this.http.post(this._baseApiUri + "/users", newUser).subscribe(
      response => {
        console.log(`Successfully registered new user with id = ${response["id"]}!`);
        this.login(newUser.email, newUser.password);
      }
    );
  }

  logout() {
    this.isAuthenticated = false;
    this.authUser = null;
    this.storageService.remove('authUser').subscribe();
  }

  getAuthorizationToken() {
    return "Bearer " + this.authToken;
  }
}
