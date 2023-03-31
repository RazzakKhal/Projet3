import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-other-profil',
  templateUrl: './other-profil.component.html',
  styleUrls: ['./other-profil.component.scss']
})
export class OtherProfilComponent {

  private params : any;
  private id : any;
  public otherUser : any;

  // récuperer les informations de l'utilisateur sur qui on a cliqué
  constructor(private route: ActivatedRoute){
    route.params.subscribe((data) => {
      this.params = data;
this.id = this.params.id;
// requete 
fetch(`http://localhost:8080/otherProfil/user/${this.id}`, {
  method :"GET",
  headers: {"Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('TokenSauvegarde') },
})
.then((response) => response.json())
.then((user) => {this.otherUser = user; console.log(this.otherUser)})
.catch(()=> console.log("utilisateur inexistant"))

    });

  }

}
