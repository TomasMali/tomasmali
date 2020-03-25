import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UploadImageService {
  localhost = "localhost"
  pi_129 = "192.168.1.129"
  pi_128 = "192.168.1.128"
  router = "93.49.6.246"
  private uploadUrl = "http://" + this.router + ":3000/upload/files";
  constructor(private http: HttpClient) { }

  uploadMyImage(image){

    return this.http.post<any>(this.uploadUrl, image) 
    }


}
