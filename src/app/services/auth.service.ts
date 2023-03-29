import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';


@Injectable({
  providedIn: 'root'
})


export class AuthService {


  private jwtService = new JwtHelperService();
  private token;
  private InfosToken: any;
  private mail: undefined | string;
  private expiration: undefined | number;

  constructor() {

    this.token = localStorage.getItem("TokenSauvegarde");
    //test sandra put this.token = localStorage.putItem("TokenModif");


  }

  getTokenInformations() {
    if (this.token !== null) {
      this.InfosToken = this.jwtService.decodeToken(this.token);
      console.log(this.InfosToken);
      return this.InfosToken;
    }
  }

  getTokenMail() {
    this.mail = this.InfosToken.sub;
    return this.mail;
  }

  getTokenExpiration() {
    this.expiration = this.InfosToken.exp;
    return this.expiration;
  }

  getToken() {
    return this.token;
  }

  

  getUserConnected() {
    this.getTokenInformations();

    return fetch("http://localhost:8080/myProfil/getUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.getToken()
      },
      body: JSON.stringify({ "mail": this.getTokenMail() })
    })


  }


  //modifier la taille
  putUserSize(size :number) {
   return fetch("http://localhost:8080/myProfil/updateSize", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.getToken()
      },
      body: JSON.stringify({ "mail": this.getTokenMail(), "size":size})
    })

  }

}



