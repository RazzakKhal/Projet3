import { Component, OnInit } from '@angular/core';
import { Picture } from '../models/picture';
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
   console.log(this.women);
  
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


   //  utiliser une methode pour ajouter une photo pour chaque femme qui en a pas
  // ce sera un objet avec propiete clé link dont la valeur sera asset/images/avatar.png 
 





// function defautPhoto(user: any, arg1: number) {
//   throw new Error('Function not implemented.');
// }


