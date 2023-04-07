import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Message } from '../models/message';

@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss']
})
export class TchatComponent {

  input : any;

  constructor(public messageService: MessageService, public authService : AuthService) {}


  sendMessage() {
    if (this.input) {
      let user = this.authService.getUser();
      let user1 = {
        id : 12,
        car_number : 0,
        date_of_birth: "1982-02-17 00:00:00.000000",
        description: "",
        firstname : "Nicolas",
        gender : "M",
        lastname : "Fuente",
        mail : "aaaaaatest@hotmail.fr",
        password : "$2a$10$l9Xk3uSXUe8FGvDzYcOPh.W8zbyvXEQqToVImuUHka18NgHaeupdS",
        pseudo : "Archi",
        role : "USER",
        size : 0,
        tain_number : 5050
      }
      this.messageService.sendMessage(JSON.stringify({content : this.input, message_receiver : user, message_sender : user1}));
      this.input = '';
    }
  }

}
