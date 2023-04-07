import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'projet3SCSS';


  // faire une injection de dépendance du AuthService en public 
  constructor(private router:Router){  }





ngOnInit(): void {

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
