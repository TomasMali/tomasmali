import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms'
import { NgxSpinnerModule } from "ngx-spinner";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ResumeComponent } from './resume/resume.component';
import { WorkComponent } from './work/work.component';
import { ContactComponent } from './contact/contact.component';
import { GithubService } from './home/github.service';
import {UserService} from './user.service';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';



// 1.
import {
  RouterModule,
  Routes
} from '@angular/router';
import { LocationStrategy, HashLocationStrategy, APP_BASE_HREF } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { SanshiComponent } from './sanshi/sanshi.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';
import { TokenInterceptorService } from './token-interceptor.service';
import { AdminComponent } from './admin/admin.component';
import { UploadImageService } from './upload-image.service';
import { UploadComponent } from './upload/upload.component';


// 2.
const routes: Routes = [
  // basic routes
  { 
    path: '', redirectTo: 'home', 
    pathMatch: 'full' 
  },
  { 
    path: 'home', 
    component: HomeComponent 
  },
  { 
    path: 'resume',
     component: ResumeComponent 
    },
  { 
    path: 'work',
    component: WorkComponent
  },
  { 
    path: 'contact', 
    component: ContactComponent 
  },
  { 
    path: 'contactus', 
    redirectTo: 'contact' 
  },
  { 
    path: 'login', 
    component: LoginComponent 
  },
  {
    path: 'myprojects/sanshi', 
    component: SanshiComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'admin',
    canActivate: [AuthGuard],
    component: AdminComponent
  }
  ,
  {
    path: 'upload',
    component: UploadComponent,
    canActivate: [AuthGuard]
  }
];





@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ResumeComponent,
    WorkComponent,
    ContactComponent,
    LoginComponent,
    SanshiComponent,
    RegisterComponent,
    AdminComponent,
    UploadComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSpinnerModule ,
    // 3.
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule
 

  ],
  providers: [
    GithubService,
   UserService,
    {provide: LocationStrategy, useClass: HashLocationStrategy},
    {provide: APP_BASE_HREF, useValue: '/'},
    // Da qui solo per Authentication
    AuthService,
    AuthGuard,
    UploadImageService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
 }
