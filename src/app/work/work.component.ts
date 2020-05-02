import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work',
  templateUrl: './work.component.html',
  styleUrls: ['./work.component.css']
})
export class WorkComponent implements OnInit {

  constructor(private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    this._auth.checkToken()
      .subscribe(
        res => {console.log(res) },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 401) {
         //     this._router.navigate(['/resume'])
        // alert("Login is requred!")
            }
          }
        }
      )
  }

}
