import { Picture } from './../models/picture';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { id } from 'date-fns/locale';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.scss']
})
export class MyProfilComponent {

  userMail: string | undefined;
  MyUser: any;
  age : any;
  date_of_birth: any;
  imageUrl: any;
  //pour les changements de l'utilisateur angular
  sizeUser : any;
  descriptionUser : any ; 
  trainNumberUser : any ;
  carNumberUser : any ;
  data : any;
  @ViewChild('fileInput') fileInput: any;
  constructor(private authService : AuthService, private formBuilder : FormBuilder){

    this.authService.getUserConnected()
    .then((value) => value.json())
    .then((data) => { 
     this.MyUser = data;
     console.log(this.MyUser)
    })

  
  }

  // insérer des photos au format JPG/PNG/JPEG
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
          .then((data)=> {this.MyUser.pictures = data; // on reinitialise la valeur de notre input afin de pouvoir ajouter d'autres photos
          this.fileInput.nativeElement.value = '';}) // j'enregiste les donnés dans ma variables pictures
          
       }else{
        this.imageUrl = "assets/images/aliciaaccepte.png";
 
      }
      };
    }
  }

  // changement de taille de l'User donc je recupere mon API
  putUserSize() {
    this.authService.putUserSize(this.sizeUser)
      .then((value) => value.json())
      .then((data) => {
        this.MyUser = data;
    
      }) 
  }

  //changement de la description de l'User
  putUserDescription(){
    this.authService.putUserDescription(this.descriptionUser)
    .then((value) => value.json())
    .then((data) => {
      this.MyUser = data;
    }) 
  }

  // changement du numero de train de l'User
  putUserTrainNumber(){
    this.authService.putUserTrainNumber(this.trainNumberUser)
    .then((value) => value.json())
    .then((data) => {
      this.MyUser = data;  
    }) 
  }

  //changement de la voiture de l'User
  putUserCarTrain(){
    this.authService.putUserCarTrain(this.carNumberUser)
    .then((value) => value.json())
    .then((data) => {
      this.MyUser = data; 
    }) 
  }

  // supprimer la photo
   deletePhoto(id : any){
    console.log("ohhh");
    this.authService.deletePhoto(id)
    .then((value) => value.json())
    .then (() => { 
      // lorsque la requête reussie on supprime 1 élément du tableau de pictures à partir de l'index 0
      this.MyUser.pictures.splice(0,1);

      // on reinitialise la valeur de notre input afin de pouvoir ajouter d'autres photos
      this.fileInput.nativeElement.value = '';

    })
   }

   // lorsque on supprime une photo, on ne peut pas ajt d'autres photos sans actualiser la page

}




