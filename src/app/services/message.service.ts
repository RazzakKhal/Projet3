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
    const serverUrl = 'http://localhost:8080/chat';
    const ws = new SockJS(serverUrl);
    this.stompClient = Stomp.over(ws);
    const that = this;
    // tslint:disable-next-line:only-arrow-functions
    this.stompClient.connect({}, function(frame : any) {
      that.stompClient.subscribe('/topic/messages', (message : any ) => {
 
      
        if (message.body) {
          that.msg.push(JSON.parse(message.body));
        }
      });
    });
  }
  
  sendMessage(message : any) {
    this.stompClient.send('/app/chat/send' , {}, message);
  }
}