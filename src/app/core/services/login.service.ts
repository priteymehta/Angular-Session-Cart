import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ILoginRequest, ILoginResponse } from '../models/ilogin';
import { AuthGuard } from '../guards/auth.guard';
import * as configuration from '../../configuration/configuration.json';


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private isAuthenticated: boolean = false;
  private _token: string;
  private loginResponse: ILoginResponse;

  constructor(private http: Http, private authGuard : AuthGuard) { }

  // #region user login methods
  Login(user: ILoginRequest): ILoginResponse {
    if (typeof user != undefined && user) {
      // user object is not null and not undefined.
      // check for user authentication
      this.isAuthenticated = true;
      this._token
      if (this.isAuthenticated) {
        // user is authenticated and login success 
        // store user token into localStorage and encrypt it.
        sessionStorage.setItem('token',this.authGuard.EncryptText(this._token,configuration.default.encryptionKey).toString());
      }
      else{
        this.loginResponse.isSuccess = false;
        this.loginResponse.message = "Invalid username or password.";
        return this.loginResponse;
      }
    }
    this.loginResponse.isSuccess = false;
    this.loginResponse.message = "Invalid user.";
    return this.loginResponse;
  }

  // #endregion user login methods
}
