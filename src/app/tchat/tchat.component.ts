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
  constructor(public messageService: MessageService, private authService : AuthService) {}
  sendMessage() {
    if (this.input) {
      let user = this.authService.getUser();
      let user1 = new User("razzak", "khal", "lolo", new Date(),"coco@mail.com", "gdgsrgbg", "M")
      this.messageService.sendMessage(JSON.stringify(new Message(this.input, user, user1)));
      this.input = '';
    }
  }

}
