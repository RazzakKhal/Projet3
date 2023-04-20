import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'projet3SCSS';

  // faire une injection de dépendance du AuthService en public 
  constructor(private router:Router){  }

ngOnInit(): void {}

  // methode pour cacher le header
showNav(){
  if(this.router.url === "/"){
    let main = document.querySelector("main") as HTMLElement;
    main.style.minHeight = "93vh";
    return false;
  }else{
    let main = document.querySelector("main") as HTMLElement;
    main.style.minHeight = "85vh";
    return true;
  }
 
  }


}
