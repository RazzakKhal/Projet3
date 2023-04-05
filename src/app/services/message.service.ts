import { Injectable } from '@angular/core';
import { Message } from '../models/message';
declare var SockJS : any;
declare var Stomp : any;


@Injectable({
  providedIn: 'root'
})
export class MessageService {
  public stompClient : any;
  public msg : any = [];

  constructor() {
    this.initializeWebSocketConnection();
  }
 
  initializeWebSocketConnection() {
    // je configure la connexion avec le back afin de pouvoir echanger des messages via websocket
    const serverUrl = 'http://localhost:8080/chat';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame : any) {
      // je souscris à la route topic/messages, c'est cette route à laquelle le serveur renvoi le message
      that.stompClient.subscribe('/topic/messages', (message : any ) => {
 
      // on récupére le corps de la réponse
        if (message.body) {
          // le corps de la réponse est notre message sous forme d'objet JSON, on le parse et on l'envoi dans notre tableau de message
          that.msg.push(JSON.parse(message.body));
        }
      });
    });
  }
  

  //j'envoi le message qui déclenche dans springboot la méthode handleMessage du tchatController
  sendMessage(message : any) {
    this.stompClient.send('/app/chat/send' , {}, message);
    
  }
}