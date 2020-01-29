import { Component, OnInit } from '@angular/core';
import {  HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sanshi',
  templateUrl: './sanshi.component.html',
  styleUrls: ['./sanshi.component.css']
})
export class SanshiComponent implements OnInit {

  response: any;

  allUsers: []

  constructor(public http: HttpClient) { 
    this.http
    .get('http://93.49.6.246:3000/users/').subscribe((response)=> {
      console.log(response)
      
      this.response = response

    })
  }

  ngOnInit() {

  }



getTables(){
  this.http
    .get('http://93.49.6.246:3000/users/').subscribe((response)=> {
      console.log(response)
      this.response = response
    })
}





}
