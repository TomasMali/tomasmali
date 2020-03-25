import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../upload-image.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  hint: string = "Choose file"
  file: File = null
  files = []
  specialEvents = null

  constructor(private _uploadImageService: UploadImageService, private _auth: AuthService, private _router: Router) { }

  ngOnInit() {
    this._auth.checkToken()
      .subscribe(
        res => this.specialEvents = res,
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



  onMultipleFileSelected(event) {
    //  console.log(event)
    this.hint = ""
    for (var i = 0; i < event.target.files.length; i++) {
      this.hint += event.target.files[i].name + " "
    }
    // The file content itself
    this.files = event.target.files;
  }




  onUpload() {
    const formData = new FormData()

    for (let image of this.files)
      formData.append('myImages', image)

    this._uploadImageService.uploadMyImage(formData)
      .subscribe(
        res => {
          this.hint = "Choose file"
          this.files = null
          console.log(res)
        },
        err => console.log(err)
      )
  }



}
