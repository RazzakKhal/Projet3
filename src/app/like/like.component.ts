import { id } from 'date-fns/locale';
import { Picture } from './../models/picture';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.scss']
})

export class LikeComponent implements OnInit {

  MyUser: any;
  public allLikes: any = [];

  constructor(public authService: AuthService, private route: ActivatedRoute, private router: Router) {
    // lorsqu'on actualise la page , si un token est présent est qu'il est expiré 
    // on le supprime et redirige vers la page de connexion

    if (this.authService.getTokenExpiration() > Date.now()) {
      localStorage.removeItem("TokenSauvegarde");
      this.router.navigate(['/'])
    }
  }

  ngOnInit() {
    this.pullUserAndLikeIfAuthServiceActualisation()
  }

  // methode qui permet de récuperer l'utilisateur et ses likes si une personne actualise la page

  pullUserAndLikeIfAuthServiceActualisation() {
    // si mon auth service ne contient plus l'utilisateur je le récupère
    if (!this.authService.getUser()) {
      this.authService.getUserConnected()
        .then((value) => value.json())
        .then((data) => {
          this.MyUser = data;
          this.authService.setUser(data);
          // je recupere les likes de la personne
          this.authService.getLikeWithUser(this.MyUser.id)
            .then((response) => response.json())
            .then((data) => {
              this.authService.setLikes(data);
              this.allLikes = this.authService.getLikes();
            })
        })
    } else {
      this.allLikes = this.authService.getLikes();
    }
  }
}


