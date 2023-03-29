
import { Component, OnInit, Injectable } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { formatDistanceStrict } from 'date-fns';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.scss']
})
export class MyProfilComponent implements OnInit{
  
  userMail : string | undefined;
  MyUser: any;
  myForm: FormGroup;
  age : any;
  date_of_birth: any;
  imageUrl: any;

  constructor(private authService : AuthService, private formBuilder : FormBuilder){
    // this.authService.getTokenInformations();
    // this.userMail = authService.getTokenMail();
    this.getUserConnected();
    this.myForm = this.formBuilder.group({
      pictures: ''
    });
  }

  ngOnInit() {
    
  }

  // onFileSelected(event: Event) { // permet d'ajouter une photo
  //   const files = (event.target as HTMLInputElement).files;
  //   if (files) {
  //     const formData = new FormData();// permet d'ajt chaque fichier à l'objet formData, & peut ensuite etre envoyé au serveur via une requette HTTP
  //     for (let i = 0; i < files.length; i++) {
  //       formData.append('photos', files[i]);
  //     }
  //   }
  // }

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
     
/*fetch("http://localhost:8080/myProfil/getUser",{
  method :"POST",
  headers: {"Content-Type": "application/json",
            "Authorization": "Bearer " + this.authService.getToken()
           },
  body : JSON.stringify({"mail" : this.userMail}) 
    })*/
  
    this.authService.getUserConnected()
  .then((value) => value.json())
  .then((data) => { 
   this.MyUser = data;
   console.log(this.MyUser)
  })
  }



}


