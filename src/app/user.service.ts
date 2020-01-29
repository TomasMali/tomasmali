import { Injectable } from '@angular/core';

import { AngularFireDatabase } from 'angularfire2/database';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  user_name : any[]

  constructor(private db: AngularFireDatabase) { 

    db.list('/user').valueChanges().subscribe(user => {
      this.user_name = user
      console.log("valore: " + this.user_name)
    })
 
  }



}
