import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  private uploadUrl = "http://localhost:3000/upload/files";
  constructor(private http: HttpClient) { }

  uploadMyImage(image){

    return this.http.post<any>(this.uploadUrl, image) 
    }


}
