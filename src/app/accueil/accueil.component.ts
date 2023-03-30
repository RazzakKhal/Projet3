import { Router } from '@angular/router';
import { Component} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../models/user';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  inscriptionForm : FormGroup;
  connexionForm: FormGroup<any>;

  constructor(private formBuilder : FormBuilder, private router : Router){
    this.inscriptionForm = this.formBuilder.group({
      lastname : [''],
      firstname : [''],
      pseudo : [''],
      date_of_birth : [''],
      mail : [''],
      password : [''],
      gender : [''], 
  });
  this.connexionForm = this.formBuilder.group({
    mail: [''],
    password : [''],
    train_number: [''],
  });
   
 
  }

  //formulaire reactif avec infos recuperées.
  userInscription(){
    let user : User = new User(this.inscriptionForm.controls['firstname'].value,this.inscriptionForm.controls['lastname'].value,this.inscriptionForm.controls['pseudo'].value, this.inscriptionForm.controls['date_of_birth'].value, this.inscriptionForm.controls['mail'].value, this.inscriptionForm.controls['password'].value,this.inscriptionForm.controls['gender'].value);

    fetch("http://localhost:8080/accueil/inscription", {
  method: "POST", 
  headers: {
    "Content-Type": "application/json",

  },
  body: JSON.stringify(user),
})
  .then((response) => response.json())
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
console.log (this.inscriptionForm.controls['lastname'].value);
  }


  //formulaire de connexion
  userConnexion(){

    let user : any = {mail : this.connexionForm.controls['mail'].value,
     password : this.connexionForm.controls['password'].value};
  
// stocker dans le localStorage
     localStorage.setItem("TrainNumber",this.connexionForm.controls['train_number'].value);
    
    fetch("http://localhost:8080/accueil/connexion", {
  method: "POST", // car on envoie nos infos
  headers: {
    "Content-Type": "application/json",

  },
  body: JSON.stringify(user),
})
//recupere la reponse
  .then((response) => response.json())
  //recupere les donneés de la reponse
  .then((data) => {
    //pour sauvegaredr le token dans ma data
    localStorage.setItem("TokenSauvegarde",data.token);
    return this.router.navigate(['/myProfil']);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
  }

}
