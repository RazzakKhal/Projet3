import { id } from 'date-fns/locale';
import { Picture } from './../models/picture';
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
  public oldPhotos : any = [];
  public allLikes : any = [];

  constructor(private authService : AuthService, private route: ActivatedRoute){
    this.allLikes = this.authService.getLikes();
    this.oldPhotos = this.authService.getUser();
    this.authService.getUserConnected()
     .then((value) => value.json())
    .then((data) => { 
     this.MyUser = data;
     console.log(this.MyUser)
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
      this.allLikes = data;
      console.log(this.allLikes);
    });
  }

  getOldPhotos(){
    //recuperer les photos des utilisateurs qui ont liké
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
    this.oldPhotos = data;
    console.log(this.oldPhotos);
  });
}}

  // ngOnInit(){
  //   this.getOldLikes();
  // }




