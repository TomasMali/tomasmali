import { Injectable } from '@angular/core';
import { CanActivate, Router  } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService,
    private _router: Router) { }

  canActivate(): boolean {
    if (this._authService.loggedIn()) {
      return true
    } else {     
    
      localStorage.setItem('lastRout', this._router.url)
      console.log(this._router.url)
      this._router.navigate(['/login'])
     // document.getElementById("loginModal").click()
      return false
    }

  }

  
}
