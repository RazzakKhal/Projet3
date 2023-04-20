import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-profil-card',
  templateUrl: './profil-card.component.html',
  styleUrls: ['./profil-card.component.scss']
})
export class ProfilCardComponent {

  constructor(private router: Router, private authService: AuthService) {
  }

  @Input() picture: string | undefined;
  @Input() pseudo: string | undefined;
  @Input() age: string | undefined;
  @Input() car: string | undefined;
  @Input() id: any;

  MyUser: any;
  likeUser: any;
  //notification
  notification: boolean = false;
  errorMessage: string = '';

  sendAtOtherProfil() {
    this.router.navigate([`other-profil/${this.id}`]);
  }

  sendLike(id: number) {
    this.authService.sendLike(id)
      .then((value) => value.json())
      .then((data) => {
        this.myNotification();
      })
  }

  myNotification() {
    this.notification = true;
    setTimeout(() => { this.notification = false }, 3000)
  }
}
