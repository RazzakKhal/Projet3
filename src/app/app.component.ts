import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'projet3SCSS';

  constructor(private router:Router){  }
  //   router est le nom de ma variable : type Router
  //router est une classe qui a pleins de methodes et proprieté dont l'url.
  // constructor (private router:Router) est une injection de dependence.


ngOnInit(): void {
  // toutes les minutes , SI LA PERSONNE EST CONNECTE, je récupère les likes. si il y en a un en plus, je les affiches
// executé une methode toutes les minutes
// cette methode verifie si la personne est connecté
// si elle est connecté, requete pour récupérer les like
// ces likes sont stocké dans une variables au dessus, si il y en a plus que la fois d'avant, notification reception like

  
}




  // methode pour cacher le header
showNav(){
  if(this.router.url === "/"){
    //mon test est  console.log(this.router.url)
    return false;
  }else{
    return true;
  }
   console.log(this.router.url)
  }
}
