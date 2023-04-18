import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HostService } from '../services/host.service';

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
  constructor(private route: ActivatedRoute, private router: Router, private hostService : HostService ){
    route.params.subscribe((data) => {
      this.params = data;
      this.id = this.params.id;
      
// requete pour récupérer l'utilisateur en fonction de l'id du other profil
fetch(`${this.hostService.host}/otherProfil/user/${this.id}`, {
  method :"GET",
  headers: {"Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('TokenSauvegarde') },
})
.then((response) => response.json())
.then((user) => {this.otherUser = user; console.log(this.otherUser)})
.catch(()=> console.log("utilisateur inexistant"))

    });

  }

  accesChat(id: any){
// au click utilisateur est redirigé sur la Messagerie
this.router.navigate([`/messagerie/${id}`]);
  }

}
