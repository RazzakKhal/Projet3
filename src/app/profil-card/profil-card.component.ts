import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent {
  @Input() picture : string | undefined;
  @Input() firstname : string | undefined;
  @Input() age : string | undefined;
  @Input() car : string | undefined;

}
