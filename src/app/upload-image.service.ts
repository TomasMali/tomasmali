import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  localhost = "localhost"
  pi_129 = "192.168.1.129"
  pi_128 = "192.168.1.128"
  router = "93.49.6.246"
  private uploadImagesUrl = "http://" + this.localhost + ":3000/upload/images";
  private uploadFilesUrl = "http://" + this.localhost + ":3000/upload/files";

  constructor(private http: HttpClient) { }

  uploadMyImage(image){
    return this.http.post<any>(this.uploadImagesUrl, image, {
      reportProgress: true,
      observe: 'events'
    }).pipe(
      catchError(this.errorMgmt)
    )
  }


  errorMgmt(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }

    uploadMyFiles(files){
      return this.http.post<any>(this.uploadFilesUrl, files ,{
        reportProgress: true,
        observe: 'events'
      }).pipe(
        catchError(this.errorMgmt)
      )
    }


}
