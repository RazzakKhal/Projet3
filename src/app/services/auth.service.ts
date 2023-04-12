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
  private likes :any = [] ;
  public lastLikePseudo : any;

  public notificationLike = false;

 constructor(){
  this.token = localStorage.getItem("TokenSauvegarde");
// lancer directement la méthode pour récupérer l'utilisateur
  if(localStorage.getItem("TokenSauvegarde")){
    this.getUserConnected()
    .then(reponse => reponse.json())
    .then(data => {
      this.user = data; 
// on récupère une premiere fois les likes une fois qu'on a reussi à récuperer l'utilisateur
      this.getLikeFirst();
// lancer toutes les minutes notre requete qui recuperera les likes de l'utilisateur pour vérifier qu'il n'en a pas de nouveaux
      this.getLikeEveryMinute();
    
    });
   }

   }
 
   getTokenInformations(){
    if(this.token !== null){
   this.InfosToken = this.jwtService.decodeToken(this.token);

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

    setUser(user : any){
      this.user = user;
    }
    
    getLikes(){
      return this.likes;
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

     //récuperer les likes + user associé
     getLikeWithUser(id:any){
      return fetch(`http://localhost:8080/galerie/collectLike/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + this.getToken()
        },
       
      })
  
     }


     // on récupère les likes la premiere fois
     getLikeFirst(){
    
        if(localStorage.getItem("TokenSauvegarde")){
         this.getLikeWithUser(this.user.id)
         .then(reponse => reponse.json())
         .then(data => this.likes = data);
        }
       }

     


     // on récupère les likes toutes les minutes et on affiche la notif si nouveau like
     getLikeEveryMinute(){
      setInterval(()=> {
    
        if(localStorage.getItem("TokenSauvegarde")){
         this.getLikeWithUser(this.user.id)
         .then(reponse => reponse.json())
         .then(data => {
          // ici je vais verifier si la longueur de data est supérieur à celle de this.like
          //si c'est le cas, alors j'ai recu un ou plusieurs like (en fonction du nombre de difference de longueur)
          //alors je vais devoir afficher une notification dans ce cas
          if(data.length > this.likes.length){
            this.notificationLike = true;
           
          }
          
          this.likes = data; console.log(this.likes)
          this.lastLikePseudo = this.likes[this.likes.length - 1][1].pseudo;
          console.log(this.lastLikePseudo)
        
        });
        }
      } , 60000)
    
    
       }
     


}