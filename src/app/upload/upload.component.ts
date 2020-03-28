import { Component, OnInit } from '@angular/core';
import { UploadImageService } from '../upload-image.service';
import { AuthService } from '../auth.service';
import { HttpErrorResponse, HttpEvent, HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.css']
})
export class UploadComponent implements OnInit {
  hint: string = "Choose images"
  file: File = null
  files = []
  specialEvents = null
  statusBarImage = ""
  //
  hintFiles: string = "Choose files"
  fileFiles: File = null
  files_files = []
  statusBar = ""

  //
  progress: number = 0;
  progress_file: number = 0;

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



  onMultipleImagesSelected(event) {
    //  console.log(event)
    this.hint = ""
    for (var i = 0; i < event.target.files.length; i++) {
      this.hint += event.target.files[i].name + " "
    }
    // The file content itself
    this.files = event.target.files;
  }

  onImagesUpload() {
    const formData = new FormData()
    for (let image of this.files)
      formData.append('myImages', image)

    this._uploadImageService.uploadMyImage(formData)
      .subscribe((event: HttpEvent<any>) => {
        this.files = []
        this.hint = "Folder name"
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            break;
          case HttpEventType.UploadProgress:
            this.progress = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress}%`);
            this.statusBarImage = 'Uploading.......'

            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.statusBarImage = 'Files successfully uploaded!'
            setTimeout(() => {
              this.progress = 0;
            }, 1500);

        }
      })
  }

  ////////////////// Files ////////////////////////


  onMultipleFilesSelected(event) {
    //  console.log(event)
    this.hintFiles = ""
    for (var i = 0; i < event.target.files.length; i++) {
      this.hintFiles += event.target.files[i].name + " "
    }
    // The file content itself
    this.files_files = event.target.files;
  }

  onFilesUpload() {
    const formData = new FormData()

    for (let file of this.files_files)
      formData.append('myFiles', file)

    this._uploadImageService.uploadMyFiles(formData)
      .subscribe((event: HttpEvent<any>) => {
        this.files_files = []
        this.hintFiles = "Choose files"
        switch (event.type) {
          case HttpEventType.Sent:
            console.log('Request has been made!');
            this.statusBar = 'Request has been made!'
            break;
          case HttpEventType.ResponseHeader:
            console.log('Response header has been received!');
            this.statusBar = 'Response header has been received!'
            break;
          case HttpEventType.UploadProgress:
            this.progress_file = Math.round(event.loaded / event.total * 100);
            console.log(`Uploaded! ${this.progress_file}%`);
            this.statusBar = 'Uploading.......'
            break;
          case HttpEventType.Response:
            console.log('User successfully created!', event.body);
            this.statusBar = 'Files successfully uploaded!'
            setTimeout(() => {
              this.progress_file = 0;
            }, 1500);

        }
      })
  }


}
