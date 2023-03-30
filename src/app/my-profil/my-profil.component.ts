import { Component, Injectable, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formatDistanceStrict } from 'date-fns';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.scss']
})
export class MyProfilComponent{
  
  userMail : string | undefined;
  MyUser: any;
  myForm: FormGroup;
  age : any;
  date_of_birth: any;
  imageUrl: any;
  //pour les changements de l'utilisateur angular
  sizeUser : any;
  descriptionUser : any ; 
  trainNumberUser : any ;
  carNumberUser : any ;

  pictures : any;
  data : any;

  constructor(private authService : AuthService, private formBuilder : FormBuilder){
    // this.authService.getTokenInformations();
    // this.userMail = authService.getTokenMail();
    this.getUserConnected();
    this.myForm = this.formBuilder.group({
      pictures: ''
    });
  
  }
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result;
        console.log(this.imageUrl);
        if(this.imageUrl.includes("jpeg") || this.imageUrl.includes("jpg") || this.imageUrl.includes("png")){
          // envoyer l'url de l'img en BDD
          fetch("http://localhost:8080/picture/addpicture",{
            method :"POST",
            headers: {"Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem('TokenSauvegarde') },
                body: JSON.stringify({link:this.imageUrl, user:this.MyUser}),
          })
          .then((response)=> response.json()) // je recupere la reponse
          .then((data)=> this.pictures = data) // j'enregiste les donnés dans ma variables pictures
          
       }else{
        this.imageUrl = "assets/images/aliciaaccepte.png";
        console.log("aucune img");
      }
      };
    }
  }



  

  onSave() { }// sauver les photos dans le back
    
  // Méthode pour obtenir l'âge formaté
  public getAge(): string {
    const ageInMs = Date.now() - this.date_of_birth.getTime();
    const age = new Date(ageInMs).getUTCFullYear() - 1972;
    return formatDistanceStrict(new Date(0), new Date(ageInMs), { unit: 'year' }) + ' ans';
  }


  getUserConnected(){
  this.authService.getUserConnected()
  .then((value) => value.json())
  .then((data) => { 
   this.MyUser = data;
   console.log(this.MyUser)
  })
  }

  // changement taille de l'user donc je recupere mon APi
  putUserSize() {
    this.authService.putUserSize(this.sizeUser)
      .then((value) => value.json())
      .then((data) => {
        this.MyUser = data;
        console.log(this.MyUser)
      }) 
  }

  //changement de la description de l'user
  putUserDescription(){
    this.authService.putUserDescription(this.descriptionUser)
    .then((value) => value.json())
    .then((data) => {
      this.MyUser = data;
      console.log(this.MyUser)
    }) 
  }


  // changement du numero de train de l'user
  putUserTrainNumber(){
    this.authService.putUserTrainNumber(this.trainNumberUser)
    .then((value) => value.json())
    .then((data) => {
      this.MyUser = data;
      console.log(this.MyUser)
    }) 
  }

  //changement de la voiture de l'user
  putUserCarTrain(){
    this.authService.putUserCarTrain(this.carNumberUser)
    .then((value) => value.json())
    .then((data) => {
      this.MyUser = data;
      console.log(this.MyUser)
    }) 
  }

}




