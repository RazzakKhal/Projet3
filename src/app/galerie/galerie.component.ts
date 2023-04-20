import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent implements OnInit{

  MyUser: any;
  women: any;
  men: any;

  constructor(public authService : AuthService, private router:Router){


  // lorsqu'on actualise la page , si un token est présent est qu'il est expiré 
  // on le supprime et redirige vers la page de connexion

  if(this.authService.getTokenExpiration() > Date.now()){
    localStorage.removeItem("TokenSauvegarde");
    this.router.navigate(['/'])
  }

  }

  ngOnInit(): void {
    
    this.checkUserGender()
    
  }

// verifier si l'utilisateur connecté est un homme

checkUserGender(){
this.authService.getUserConnected()
  .then((value) => value.json())

  .then((data) => {
    
   this.MyUser = data;
   
   this.getWomenOrMenTrain()
  });
}


// Recuperer les femmes ou les hommes du même train

getWomenOrMenTrain(){
if (this.MyUser.gender ==='M'){
  this.authService.findFemaleByTrainNumber(this.MyUser.id)
  .then((value) => value.json())

  .then(women => {
    
   this.women = women;
  
  
   this.women.forEach((woman: any) => {
    if(woman.pictures.length === 0){
      woman.pictures.push({
        link: "assets/images/avatar.jpg"
      })
    }
  })
});
}
  
else if (this.MyUser.gender === 'F'){
  this.authService.findMaleByTrainNumber(this.MyUser.id)
  .then((value) => value.json())

  .then(men => {
    
   this.men = men;

  this.men.forEach((man: any) => {
    if(man.pictures.length === 0){
      man.pictures.push({
        link: "assets/images/avatar.jpg"
      })
    }
  })
});

}
}
}



