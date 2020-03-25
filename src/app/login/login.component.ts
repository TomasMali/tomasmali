import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginUserData = {}
  rememberMe = false

  constructor(private _router: Router, private _auth: AuthService) { }
  
  ngOnInit() {

  }


  loginUser() {
    console.log(this.loginUserData)
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
     //   console.log(res)
        localStorage.setItem('token', res.token)
        this._router.navigate(['admin'])
      },
      err => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {
          //  this._router.navigate(['/resume'])
          alert("Email o Password sbagliato!")
          }
        }
      }
      
    )
    
  }

}
