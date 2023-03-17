import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projet3SCSS';

  constructor(private router:Router){  }
  //   router est le nom de ma variable : type Router
  //router est une classe qui a pleins de methodes et proprieté dont l'url.
  // constructor (private router:Router) est une injection de dependence.

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
