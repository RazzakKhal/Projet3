import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
private jwtService = new JwtHelperService();
  private token;
  private InfosToken : any;
  private mail : undefined | string;
  private expiration : undefined | number;
  private user : any;

 constructor(){
   this.token = localStorage.getItem("TokenSauvegarde");
   if(localStorage.getItem("TokenSauvegarde")){
    this.getUserConnected()
    .then(reponse => reponse.json())
    .then(data => this.user = data);
   }

   }
 
   getTokenInformations(){
    if(this.token !== null){
   this.InfosToken = this.jwtService.decodeToken(this.token);
   console.log(this.InfosToken);
   return this.InfosToken;
    }
  }

    getTokenMail(){
      this.mail = this.InfosToken.sub;
      return this.mail;
    }

    getTokenExpiration(){
      this.expiration = this.InfosToken.exp;
      return this.expiration;
    }

    getToken(){
      return this.token;
    }

    getUserConnected(){
     this.getTokenInformations();
     return fetch("http://localhost:8080/myProfil/getUser",{
        method :"POST",
        headers: {"Content-Type": "application/json",
                  "Authorization": "Bearer " + this.getToken()
                 },
        body : JSON.stringify({"mail" : this.getTokenMail()})
          })
         
    }

    getUser(){
      return this.user;
    }
    


// recuperer les femmes du même train
    findFemaleByTrainNumber(id: number){
return fetch(`http://localhost:8080/galerie/femme/${id}`,{
  method :"GET",
  headers: {"Content-Type": "application/json",
            "Authorization": "Bearer " + this.getToken()
           },
    })
    }
    findMaleByTrainNumber(id: number){
      return fetch(`http://localhost:8080/galerie/homme/${id}`,{
        method :"GET",
        headers: {"Content-Type": "application/json",
                  "Authorization": "Bearer " + this.getToken()
                 },
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


    //modifier la description
   putUserDescription(description : string){
    return fetch("http://localhost:8080/myProfil/updateDescription", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.getToken()
      },
      body: JSON.stringify({ "mail": this.getTokenMail(), "description":description})
    })
   }

   //modifier le numero du train
   putUserTrainNumber(train_number : number){
    return fetch("http://localhost:8080/myProfil/updateNumberTrain", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.getToken()
      },
      body: JSON.stringify({ "mail": this.getTokenMail(), "train_number":train_number})
    })
   }

   putUserCarTrain(carNumber : number){
    return fetch("http://localhost:8080/myProfil/updateCarTrain", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.getToken()
      },
      body: JSON.stringify({ "mail": this.getTokenMail(), "car_number":carNumber})
    })
   }

   //Supprimer la photo de l'User
   deletePhoto(id : any){
    return fetch(`http://localhost:8080/picture/deletepicture/${id}`, {
      method : "DELETE",
      headers : {"Content-Type": "application/json",
                  "Authorization": "Bearer " + this.getToken()
                  },
                  body: JSON.stringify({ "mail": this.getTokenMail(), "link":id})
   })
  }

  //liker un utilisateur
  sendLike(id : any){
    return fetch(`http://localhost:8080/galerie/like/${id}`, {
      method : "POST",
      headers : {"Content-Type": "application/json",
                  "Authorization": "Bearer " + this.getToken()
                  },
                  body: JSON.stringify(this.user)
                  
   })
  
  }


}