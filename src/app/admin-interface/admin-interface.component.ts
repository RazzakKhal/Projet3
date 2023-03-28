import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin-interface',
  templateUrl: './admin-interface.component.html',
  styleUrls: ['./admin-interface.component.scss']
})

export class AdminInterfaceComponent implements OnInit {
  users: any[] = [];
  userId: any;

  ngOnInit(): void {
   this.findAllUser()
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
  console.log(data)
})
}
// Afficher à l'aide d'une boucle tous les utilisateurs dans le HTML
// mettre un bouton pour supprimer l'utilisateur en question

/*deleteUser() {
  let token = localStorage.getItem("TokenSauvegarde");
  fetch("http://localhost:8080/admin/deleteuser", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  })
}*/



}
