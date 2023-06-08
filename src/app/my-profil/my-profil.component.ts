import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { HostService } from '../services/host.service';

@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.component.html',
  styleUrls: ['./my-profil.component.scss']
})
export class MyProfilComponent {

  userMail: string | undefined;
  MyUser: any;
  age: any;
  date_of_birth: any;
  imageUrl: any;
  //pour les changements de l'utilisateur angular
  sizeUser: any;
  descriptionUser: any;
  trainNumberUser: any;
  carNumberUser: any;
  data: any;
  selectedSlide = 0;  //caroussel


  @ViewChild('fileInput') fileInput: any;
  @ViewChild('inputSize') inputSize: any;
  @ViewChild('inputDescription') inputDescription: any;
  @ViewChild('inputCar') inputCar: any;


  constructor(public authService: AuthService, private router: Router, private hostService: HostService) {

    this.authService.getUserConnected()
      .then((value) => value.json())
      .then((data) => {
        this.MyUser = data;
  
      })

    // lorsqu'on actualise la page , si un token est présent est qu'il est expiré 
    // on le supprime et redirige vers la page de connexion

    if (this.authService.getTokenExpiration() > Date.now()) {
      localStorage.removeItem("TokenSauvegarde");
      this.router.navigate(['/'])
    }
  }

  
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload =  () => {
      const originalImageUrl: any = reader.result;

          // Envoyer l'URL de l'image en BDD
          fetch(`${this.hostService.host}/picture/addpicture`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("TokenSauvegarde"),
            },
            body: JSON.stringify({ link: originalImageUrl, user: this.MyUser }),
          })
            .then((response) => response.json()) // Je récupère la réponse
            .then((data) => {
              this.MyUser.pictures = data; // J'enregistre les données dans ma variable pictures
              this.fileInput.nativeElement.value = ""; // On réinitialise la valeur de notre input afin de pouvoir ajouter d'autres photos
            });
        
      };
    }
  }



  // changement de taille de l'User donc je recupere mon API

  putUserSize() {

    this.authService.putUserSize(this.sizeUser)
      .then((value) => value.json())
      .then((data) => {
        this.MyUser = data;
        this.inputSize.nativeElement.value = "";
      })
  }

  //changement de la description de l'User
  putUserDescription() {
    this.authService.putUserDescription(this.descriptionUser)
      .then((value) => value.json())
      .then((data) => {
        this.MyUser = data;
        this.inputDescription.nativeElement.value = "";
      })
  }

  //changement de la voiture de l'User
  putUserCarTrain() {
    this.authService.putUserCarTrain(this.carNumberUser)
      .then((value) => value.json())
      .then((data) => {
        this.MyUser = data;
        this.inputCar.nativeElement.value = "";
      })
  }

  // supprimer la photo
  deletePhoto(id: any) {
    this.authService.deletePhoto(id)
      .then((value) => value.json())
      .then(() => {
        // lorsque la requête reussie on supprime 1 élément du tableau de pictures à partir de l'index 0
        this.MyUser.pictures.splice(0, 1);

        // on reinitialise la valeur de notre input afin de pouvoir ajouter d'autres photos
        this.fileInput.nativeElement.value = '';

      })
  }

  //pour le carroussel passer à la photo suivante
  SlideChangeNext() {
    this.selectedSlide++;

  }
  //pour le carroussel passer à la photo précedante
  SlideChangePrevious() {
    this.selectedSlide--;
  }
}





