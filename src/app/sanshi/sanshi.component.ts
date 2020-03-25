import { Component, OnInit } from '@angular/core';
import {  HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-sanshi',
  templateUrl: './sanshi.component.html',
  styleUrls: ['./sanshi.component.css']
})
export class SanshiComponent implements OnInit {

  response: any;

  allUsers: []

  constructor(public http: HttpClient, public _router: Router, private _auth: AuthService) { 
    localStorage.setItem('lastRout', 'myprojects/sanshi')
    this.http
    .get('http://93.49.6.246:3000/users/').subscribe((response)=> {
      console.log(response)
      
      this.response = response

    })
  }

  ngOnInit() {
    this._auth.checkToken()
    .subscribe(
      res => res = res,
      err => {
      //  alert("Login is requred!")
      if (err instanceof HttpErrorResponse) {
        if (err.status === 500) {
          this._router.navigate(['/login'])
          }
        }
      }
    )
  }



getTables(){
  this.http
    .get('http://93.49.6.246:3000/users/').subscribe((response)=> {
      console.log(response)
      this.response = response
    })
}





}
