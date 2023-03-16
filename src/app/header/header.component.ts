import { Component } from '@angular/core';
import { HeaderService } from '../services/header.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})

export class HeaderComponent {
 
  constructor(private router:Router){  }
  
// methode pour cacher le header
showNav2(){
if(this.router.url === "/"){
  //mon test est  console.log(this.router.url)
  return false;
}else{
  return true;
}
 console.log(this.router.url)
}

}

