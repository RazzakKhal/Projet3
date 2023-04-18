import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})

export class AdminInterfaceComponent implements OnInit {
  users: any[] = [];
  

  constructor(private authService : AuthService){

  }

  ngOnInit(): void {
   this.findAllUser()
   this.findUserConnected()

  }

  findUserConnected(){
    // si on ne sait pas qui est connecté, alors on le récupère et on le rajoute dans le authService
    if(this.authService.getUser() === undefined){
      this.authService.getUserConnected()
      .then((reponse : any) => reponse.json())
      .then((data : any) => this.authService.setUser(data))
    }
  }

// faire une requete permettant de recuperer les utilisteurs
findAllUser(){
let token= localStorage.getItem("TokenSauvegarde");

fetch("http://localhost:8080/admin/alluser",{
method :"GET",
headers: {"Content-Type": "application/json",
          "Authorization": "Bearer " + token }
  })

.then((value) => value.json())
.then((data) => {
  this.users = data
 // si ils n'ont pas de photo, je leur colle un avatar
 this.users.forEach((user: any) => {
  if(user.pictures.length === 0){
    user.pictures.push({
      link: "assets/images/avatar.jpg"
    })
  }
})

})
}
// Afficher à l'aide d'une boucle tous les utilisateurs dans le HTML
// mettre un bouton pour supprimer l'utilisateur en question

deleteUser(id: number) {
 
  let token = localStorage.getItem("TokenSauvegarde");
  fetch(`http://localhost:8080/admin/deleteuser/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
    body: JSON.stringify({mail: this.authService.getUser().mail})
  })

    this.users = this.users.filter((user) => user.id !== id );



}



}
