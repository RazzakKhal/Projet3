import { Component, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { HostService } from '../services/host.service';
declare var SockJS: any;
declare var Stomp: any;
@Component({
  selector: 'app-tchat',
  templateUrl: './tchat.component.html',
  styleUrls: ['./tchat.component.scss']
})
export class TchatComponent implements OnDestroy {
  input: any;
  params: any;
  id: number = 0;
  otherUser: any;
  public stompClient: any;
  public msg: any = [];
  public oldMsg: any = [];
  oldMsgSend: any = [];
  oldMsgReceived: any = [];


  constructor(public authService: AuthService, private route: ActivatedRoute, private hostService: HostService) {
    // si l'utilisateur n'est plus enregistré dans le authService alors je le recupère
    if (!this.authService.getUser()) {
      this.authService.getUserConnected()
        .then(reponse => reponse.json())
        .then((data) => this.authService.setUser(data))
    }
    this.getOtherUser();



  }
  sendMessage() {

    if (this.input) {
     
      let userConnected = this.authService.getUser();
      let userReceiver = this.otherUser;
      //j'envoi le message qui déclenche dans springboot la méthode handleMessage du tchatController
      this.stompClient.send(`/app/chat/send/${userConnected.id}/${userReceiver.id}`,
       {}, JSON.stringify({ content: this.input, messageSender: { id: userConnected.id }, 
        messageReceiver: { id: userReceiver.id } }));
      // j'ajoute à mon tableau de message recents
      this.msg.push({ content: this.input, isMine: true })
      this.input = '';
    }
  }
  getOtherUser() {
    this.route.params.subscribe((data) => {
      this.params = data;
      this.id = this.params.id;
      let reussite = false;
      // requete pour récupérer l'utilisateur en fonction de l'id du other profil
      fetch(`${this.hostService.host}/otherProfil/user/${this.id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem('TokenSauvegarde')
        },
      })
        .then(
          (response) => { reussite = true; return response.json()}
          )
        .then((user) => {
        
          this.otherUser = user;
          this.getBddMessages()
  
          
        })
        .catch(() => {console.log("utilisateur inexistant"); 
        
        if(reussite = true){ this.getOtherUser()}
       })
    });
  }
  initializeWebSocketConnection() {
    // je configure la connexion avec le endpoint du back afin de pouvoir echanger des messages via websocket
    const serverUrl = `${this.hostService.host}/chat`;
    const socket = new SockJS(serverUrl);
    this.stompClient = Stomp.over(socket);
    const that = this;
    // souscription à la premiere adresse
    this.stompClient.connect({}, function (frame: any) {
      // je souscris à la route topic/messages, c'est cette route à laquelle le serveur renvoi le message
      that.stompClient.subscribe(`/topic/messages/${that.otherUser.id}/${that.authService.getUser().id}`,
       (message: any) => {
        // on récupére le corps de la réponse
        if (message.body) {
          // le corps de la réponse est notre message sous forme d'objet JSON, 
          // on le parse et on l'envoi dans notre tableau de message
          let messageReceived = JSON.parse(message.body)
          messageReceived.isMine = false;
          that.msg.push(messageReceived);
        }
      });
    });
  }
  getBddMessages() {
    // récuperer les messages que l'utilisateur a envoyé
    fetch(`${this.hostService.host}/messageriesend/${this.authService.getUser().id}/${this.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("TokenSauvegarde")
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        this.oldMsgSend = data;
        // j'ajoute une propriété isMine pour pouvoir différencier mes messages et celui des autres
        this.oldMsgSend.forEach((message: any) => { message.isMine = true; this.oldMsg.push(message) });
        this.oldMsg.sort((message1: any, message2: any) => {
          return message1.id - message2.id;
        });
        // je requete le endPoint pour lancer la connexion + je souscris à mes routes
        this.initializeWebSocketConnection();
      })
    // récupérer les messages que l'utilisateur à recu
    fetch(`${this.hostService.host}/messageriereceive/${this.authService.getUser().id}/${this.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": "Bearer " + localStorage.getItem("TokenSauvegarde")
        },
      }
    )
      .then(response => response.json())
      .then(data => {
        this.oldMsgReceived = data;
        this.oldMsgReceived.forEach((message: any) => { message.isMine = false; this.oldMsg.push(message) });
        // trier les messages selon leur id
        this.oldMsg.sort((message1: any, message2: any) => {
          return message1.id - message2.id;
        });
      })
  }

  // on se deconnecte des websocket en changeant de page
  ngOnDestroy(): void {
    this.stompClient.disconnect();
  }
}