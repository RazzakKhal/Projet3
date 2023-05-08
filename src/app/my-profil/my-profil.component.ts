import { Picture } from './../models/picture';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { id } from 'date-fns/locale';
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

  // Insérer des photos au format JPG/PNG/JPEG
  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const originalImageUrl: any = reader.result;

        if (
          originalImageUrl.includes("jpeg") ||
          originalImageUrl.includes("jpg") ||
          originalImageUrl.includes("png")
        ) {
          // Compresser l'image avant de l'envoyer en BDD
          const compressedImageUrl = await this.compressImage(file);
          console.log(compressedImageUrl);

          // Envoyer l'URL de l'image compressée en BDD
          fetch(`${this.hostService.host}/picture/addpicture`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("TokenSauvegarde"),
            },
            body: JSON.stringify({ link: compressedImageUrl, user: this.MyUser }),
          })
            .then((response) => response.json()) // Je récupère la réponse
            .then((data) => {
              this.MyUser.pictures = data; // J'enregistre les données dans ma variable pictures
              this.fileInput.nativeElement.value = ""; // On réinitialise la valeur de notre input afin de pouvoir ajouter d'autres photos
            });
        } else {
          this.imageUrl = "assets/images/aliciaaccepte.png";
        }
      };
    }
  }

  // Fonction pour compresser l'image
  compressImage(file: any, quality = 0.6, maxWidth = 600, maxHeight = 600) {
    return new Promise((resolve, reject) => {
      const url = URL.createObjectURL(file);
      const image = new Image();
      image.src = url;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx: any = canvas.getContext("2d");

        const aspectRatio = image.width / image.height;
        let newWidth = maxWidth;
        let newHeight = maxHeight;

        if (image.width > image.height) {
          newHeight = maxWidth / aspectRatio;
        } else {
          newWidth = maxHeight * aspectRatio;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        ctx.drawImage(image, 0, 0, newWidth, newHeight);
        const compressedImage = canvas.toDataURL("image/jpeg", quality);

        resolve(compressedImage);
      };
      image.onerror = (error) => {
        reject(error);
      };
    });
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





