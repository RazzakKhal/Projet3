import { User } from './';

export class Message {

    private id : number;
    private content : string;
    private userSender : User;
    private userReceiver : User;

    constructor(content : string, userSender : User, userReceiver : User){
        this.content = content;
        this.userSender = userSender;
        this.userReceiver = userReceiver;
    }

    getId():number{
        return this.id;   
    }

    setId(id : number){
        this.id = id;
    }

    getContent() : string{
        return this.content;
    }

    setContent(content : string){
        this.content = content;
    }

    getUserSender() : User{
        return this.userSender;
    }

    setUserSender(userSender : User){
        this.userSender = userSender;
    }

    getUserReceiver() : User{
        return this.userReceiver;
    }

    setUserReceiver(userReceiver : User){
        this.userReceiver = userReceiver;
    }
}
