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

  constructor(private formBuilder : FormBuilder){
    this.inscriptionForm = this.formBuilder.group({
      lastname : [''],
      firstname : [''],
      pseudo : [''],
      date_of_birth : [''],
      mail : [''],
      password : [''],
      gender : [''], 
  });
   
  }


  //formulaire reactif avec infos recuperées
  userInscription(){
    let user : User = new User(this.inscriptionForm.controls['firstname'].value,this.inscriptionForm.controls['lastname'].value,this.inscriptionForm.controls['pseudo'].value, this.inscriptionForm.controls['date_of_birth'].value, this.inscriptionForm.controls['mail'].value, this.inscriptionForm.controls['password'].value,this.inscriptionForm.controls['gender'].value);

    fetch("http://localhost:8080/accueil/inscription", {
  method: "POST", // or 'PUT'
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
}
