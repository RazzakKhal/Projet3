import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent implements OnInit{

  

  MyUser: any;

  women: any;
  men: any;
  constructor(private authService : AuthService){

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
   console.log(this.MyUser)
   this.getWomenOrMenTrain()
  })
}


// Recuperer les femmes du meme train

getWomenOrMenTrain(){
if (this.MyUser.gender ==='M'){
  this.authService.findFemaleByTrainNumber(this.MyUser.id)
  .then((value) => value.json())

  .then((women) => {
    
   this.women = women;
   console.log(this.women)
   
  })
}
else if (this.MyUser.gender === 'F'){
  this.authService.findMaleByTrainNumber(this.MyUser.id)
  .then((value) => value.json())

  .then((men) => {
    
   this.men = men;
   console.log(this.men)
   })
  }
}
}
  



