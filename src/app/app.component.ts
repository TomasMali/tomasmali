import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireDatabase } from 'angularfire2/database';
import {  ElementRef,  ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from './auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  user_name: any[]
validation : boolean= false;
@ViewChild('btnClose',{static: true}) btnClose : ElementRef ;




  // 4.
  constructor(private router: Router,  db: AngularFireDatabase, private spinner: NgxSpinnerService, private _authService : AuthService) {
    db.list('/user').valueChanges().subscribe(user => {
      this.user_name = user
      console.log("valore: " + this.user_name)
    })
  }


  title = 'Resume';


  downloadResume() {

    window.open("../assets/CV-Europass-20180504-Mali-IT.pdf");
    return false;

  }

}
