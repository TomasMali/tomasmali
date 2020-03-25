import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {

  private _registerUrl = "http://localhost:3000/api/register"
  private _loginUrl = "http://localhost:3000/api/login";
  private _checkToken = "http://localhost:3000/api/checkToken"




  constructor(private http: HttpClient, private _router: Router) { }

  // the backen respons with the register user or an error
  registerUser(user) {
    return this.http.post<any>(this._registerUrl, user)
  }

  loginUser(user) {
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn() {
    return !!localStorage.getItem('token')
  }

  logoutUser() {
    localStorage.removeItem('token')
    this._router.navigate(['/home'])
  }

  getToken() {
    return localStorage.getItem('token')
  }

  checkToken() {
    return this.http.get<any>(this._checkToken)
  }


}
