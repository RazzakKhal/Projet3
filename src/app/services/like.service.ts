import { id } from 'date-fns/locale';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LikeService implements OnInit{


  myLikes = [] ;

  constructor(private authService : AuthService) { 
    setInterval(() => this.collectLike(this.authService.getUser().getId()), 1000);
  
  }

  collectLike(id : any){
   if(localStorage.getItem("TokenSauvegarde")
   ){
    fetch(`http://localhost:8080/collectLike/${id}`)
    .then ((reponse) => reponse.json())
    .then ((data)  =>{console.log("requête exécutée");
     if(data.length > this.myLikes.length){
    //notification return true si un like supplémentaire
    console.log("J'ai été likée");
  this.myLikes = data; 
  }

})}
 }

 ngOnInit(){ // permet de lancer la methode toutes les 30 secondes
  // this.collectLike(this.authService.getUser().getId());
  // setInterval( () => this.collectLike(this.authService.getUser().getId()), 1000);
 }

  }
