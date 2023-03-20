import { Component } from '@angular/core';
import { User } from '../models/user';


@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent {
//formulaire reactif avec infos recuperées
userInscription(){
  let user : User = new User("Alicia", "Critelli", "toto", new Date(), "alicia.critelli@sncf.fr", "aliciawazaa", "female");
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
}
}
