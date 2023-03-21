import { Component } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent implements OnInit{

  user {"Rico","Gourme","rico", new Date(), "rico.gourmel@sncf.fr","toto","M"};

  constructor(){}

  ngOnInit(): void{
    
  fetch('http://localhost:8080/galerie/Femme/${this.user.id}').then((data)=> console.log(data))
    
  }
  }

}
