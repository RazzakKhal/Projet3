import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent {

  constructor(private router:Router){

  }

  @Input() picture : string | undefined;
  @Input() firstname : string | undefined;
  @Input() age : string | undefined;
  @Input() car : string | undefined;
  @Input() id : any;


  sendAtOtherProfil(){
  
    this.router.navigate([`other-profil/${this.id}`]);
  
  }

  sendLike(id : number){
    
  }

}
