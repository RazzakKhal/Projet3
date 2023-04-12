import { Component } from '@angular/core';
import { MessageService } from '../services/message.service';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Message } from '../models/message';
import { ActivatedRoute } from '@angular/router';
declare var SockJS : any;
declare var Stomp : any;


@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss']
})
export class TchatComponent {

  input : any;
  params : any;
  id!: number;
  otherUser: any;
  public stompClient : any;
  public msg : any = [];
  public oldMsg : any = [];

  constructor(private authService : AuthService, private route: ActivatedRoute) {
      this.getOtherUser();

    // je requete le endPoint pour lancer la connexion + je souscris à mes routes
    this.initializeWebSocketConnection();


  }



  sendMessage() {
    //DELETE UPDATE SELECT INSERT A BANNIR
    if (this.input) {
      // regex (expression reguliere pour detecter les requetes SQL)
      const requeteSql = /SELECT|UPDATE|DELETE|INSERT/i;
      if (requeteSql.test(this.input)) {
        alert('Requête SQL non autorisée détectée !');
        return;
      }

      let userConnected = this.authService.getUser();
      let userReceiver = this.otherUser;
        //j'envoi le message qui déclenche dans springboot la méthode handleMessage du tchatController
      this.stompClient.send(`/app/chat/send/${userConnected.id}/${userReceiver.id}` , {}, JSON.stringify({content : this.input, messageSender: userConnected, messageReceiver : userReceiver}));

      this.input = '';
    }
  }


  getOtherUser(){

    this.route.params.subscribe((data) => {
      this.params = data;
  this.id = this.params.id;
  // requete pour récupérer l'utilisateur en fonction de l'id du other profil
  fetch(`http://localhost:8080/otherProfil/user/${this.id}`, {
  method :"GET",
  headers: {"Content-Type": "application/json",
      "Authorization": "Bearer " + localStorage.getItem('TokenSauvegarde') },
  })
  .then((response) => response.json())
  .then((user) => {this.otherUser = user;
  this.getBddMessages()
  })
  .catch(()=> console.log("utilisateur inexistant"))

    });
  }

  initializeWebSocketConnection() {
    // je configure la connexion avec le endpoint du back afin de pouvoir echanger des messages via websocket
    const serverUrl = 'http://localhost:8080/chat';
    const socket  = new SockJS(serverUrl);
    this.stompClient = Stomp.over(socket);
    const that = this;



    // souscription à la premiere adresse
    this.stompClient.connect({}, function(frame : any) {
      // je souscris à la route topic/messages, c'est cette route à laquelle le serveur renvoi le message
      that.stompClient.subscribe(`/topic/messages/${that.otherUser.id}/${that.authService.getUser().id}`, (message : any ) => {

      // on récupére le corps de la réponse
        if (message.body) {
          // le corps de la réponse est notre message sous forme d'objet JSON, on le parse et on l'envoi dans notre tableau de message
          that.msg.push(JSON.parse(message.body));
        }
      });
    });


  }

  getBddMessages(){
     // récuperer les informations de l'utilisateur sur qui on a cliqué
    fetch(`http://localhost:8080/messagerie/${this.authService.getUser().id}/${this.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization" : "Bearer " + localStorage.getItem("TokenSauvegarde")

        },

      }
    )
    .then(response => response.json())
    .then(data => this.oldMsg = data)

  }

}
