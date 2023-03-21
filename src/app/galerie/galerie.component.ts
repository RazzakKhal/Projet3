import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';

@Component({
  selector: 'app-galerie',
  templateUrl: './galerie.component.html',
  styleUrls: ['./galerie.component.scss']
})
export class GalerieComponent implements OnInit{

  user = {id: 8, firstname : "Razzak", lastname : "Khalfallah"};

  constructor(){

  }

  ngOnInit(): void {
    fetch(`http://localhost:8080/galerie/femme/${this.user.id}`).then((data)=> data.json()).then(data => console.log(data)); 
  }



}
