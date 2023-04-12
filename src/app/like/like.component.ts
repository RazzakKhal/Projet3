import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})
export class LikeComponent {

  
  MyUser: any;
  public oldLikes : any = [];


  constructor(private authService : AuthService, private route: ActivatedRoute){
    this.oldLikes = this.authService.getLikes();
    this.authService.getUserConnected()
    .then((value) => value.json())
    .then((data) => { 
     this.MyUser = data;
     this.getOldLikes();
  
    })  
  }

  getOldLikes(){
    // récupérer les likes de l'utilisateur connecté
    fetch (`http://localhost:8080/galerie/collectLike/${this.authService.getUser().id}`,
      {
        method: "GET", 
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + localStorage.getItem("TokenSauvegarde")
        },
      }
    )
    .then(response => response.json())
    .then(data => {
      this.oldLikes = data;

    });
  }

 

}


