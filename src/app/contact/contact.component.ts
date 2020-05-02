import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// import custom validator to validate that password and confirm password fields match
import { MustMatch } from '../_helpers/must-match.validator';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';

const url_heroku = "https://infinite-savannah-92995.herokuapp.com/email/send";
const url_pi = "http://93.49.6.246:3000/email/send";


@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {


  registerForm: FormGroup;
  submitted = false;
  clear = false

name: any
email: any
emailtext: any

  constructor(public http: HttpClient, private formBuilder: FormBuilder, private spinner: NgxSpinnerService) { }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      emailtext: ['', ]
  });
  }

  // convenience getter for easy access to form fields
  get f() { return this.registerForm.controls; }



  onSubmit(registerForm) {
    this.submitted = true;
   // this.spinner.show();

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    let params = {
      name: this.registerForm.value.firstName,
      email: this.registerForm.value.email,
      emailtext: this.registerForm.value.emailtext
    }


    this.http.post(url_heroku, params).subscribe(data => {
      console.log(data)
      if (data == true) {
     //   this.spinner.hide();
        
        alert("Email inviato!")
      }                                      
      else
      {
        alert("Problema al server Gmail!")
      }
      
            registerForm.reset()
            this.clear = true
    
    });

}























  ////////////////////////////////////////////////////

  send(){
    console.log(this.name)
 
    let params = {
      name: this.name,
      email: this.email,
      emailtext: this.emailtext
    }

    this.http.post(url_heroku, params).subscribe(data => {
      console.log(data)
      if (data == true) {
        alert("Email inviato!")
        this.name= ""
        this.email= ""
        this.emailtext = ""
      }                                      
      else
        {
          this.http.post(url_heroku, params,  
          {
            headers: new HttpHeaders().set('Content-Type', 'application/json'),
            responseType: 'json' 
         }
                
          ).subscribe(data => {
            console.log(data)
            if (data == true) {
              alert("Email inviato!")
              this.name= ""
              this.email= ""
              this.emailtext = ""
            }
            else
           {
            alert("Email inviato!!!")
            this.name= ""
            this.email= ""
            this.emailtext = ""
           }
          });
        }
    
    });




  }



}
