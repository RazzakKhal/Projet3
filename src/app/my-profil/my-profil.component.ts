
import { Component } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';



@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.scss']
})
export class MyProfilComponent {

  userMail: string | undefined;
  MyUser: any;
  sizeUser : any;
  

  constructor(private authService: AuthService) {
    // this.authService.getTokenInformations();
    // this.userMail = authService.getTokenMail();
    this.getUserConnected();
    // this.putUserSize();
  }

  getUserConnected() {

    /*fetch("http://localhost:8080/myProfil/getUser",{
      method :"POST",
      headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + this.authService.getToken()
               },
      body : JSON.stringify({"mail" : this.userMail}) 
        })*/

    this.authService.getUserConnected()
      .then((value) => value.json())
      .then((data) => {

        this.MyUser = data;
        console.log(this.MyUser)
      })
  }

// changement taille de l'user donc je recupere mon APi
  putUserSize() {
    this.authService.putUserSize(this.sizeUser)
      .then((value) => value.json())
      .then((data) => {
        this.MyUser = data;
        console.log(this.MyUser)
      })
    
  }


}

