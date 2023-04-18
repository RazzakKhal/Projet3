import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {

  inscriptionForm: FormGroup;
  connexionForm: FormGroup<any>;
  notification: boolean = false;
  errorMessage: string = 'Veuillez verifier vos identifiants de connexion';


  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.inscriptionForm = this.formBuilder.group({
      lastname: ['', Validators.required],
      firstname: ['', Validators.required],
      pseudo: ['', Validators.required],
      date_of_birth: ['', Validators.required],
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      gender: ['', Validators.required],
    });
    this.connexionForm = this.formBuilder.group({
      mail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      train_number: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(4)]],
    });

  }

  onSubmitConnexion() {
    if (this.connexionForm.valid) {
      this.userConnexion();
      this.inscriptionForm.reset();
    } else {
      console.log('Formulaire de connexion invalide');
    }
  }
  onSubmitInscription() {
    if (this.inscriptionForm.valid) {
      this.userInscription();
      this.inscriptionForm.reset();
    } else {
      console.log('Formulaire inscription invalide');
      
    }
  }

  //formulaire reactif avec infos recuperées.
  userInscription() {
    let user: User = new User(
      this.inscriptionForm.controls['firstname'].value,
      this.inscriptionForm.controls['lastname'].value,
      this.inscriptionForm.controls['pseudo'].value,
      this.inscriptionForm.controls['date_of_birth'].value,
      this.inscriptionForm.controls['mail'].value,
      this.inscriptionForm.controls['password'].value,
      this.inscriptionForm.controls['gender'].value);

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
        // envoi de la notification réussie de l'inscription
        this.modifNotification();
        // dans 1s la notification disparaît
        setTimeout(() => this.modifNotification(), 3000);

      })
      .catch((error) => {
        console.error("Error:", error);
      });
    console.log(this.inscriptionForm.controls['lastname'].value);
  }

  modifNotification() {
    this.notification = !this.notification;
  }

  //formulaire de connexion
  userConnexion() {

    let user: any = {
      mail: this.connexionForm.controls['mail'].value,
      password: this.connexionForm.controls['password'].value,
      train_number: this.connexionForm.controls['train_number'].value
    };

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
        localStorage.setItem("TokenSauvegarde", data.token);
        return this.router.navigate(['/myProfil']);
      })
      .catch(() => {
        this.notification = true;
        setTimeout(() => this.notification = false, 5000)
      });
  }

}
//faire notification lorsqu'il y a probleme de connection
