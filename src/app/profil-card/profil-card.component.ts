import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent {

  constructor(private router:Router,private authService : AuthService){
  }

  @Input() picture : string | undefined;
  @Input() firstname : string | undefined;
  @Input() age : string | undefined;
  @Input() car : string | undefined;
  @Input() id : any;

  MyUser: any;
  likeUser : any;

  sendAtOtherProfil(){
  
    this.router.navigate([`other-profil/${this.id}`]);
  
  }

  sendLike(id : number){
    this.authService.sendLike(id)
    .then((value) => value.json())
    .then((data) => {
      
      console.log("Success Like:", data);
    }) 
    
  }



}
