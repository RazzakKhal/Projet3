export class User {
  private id : number = 0;
  private firstname : string;
  private lastname : string;
  private pseudo : string;
  private date_Of_Birth : Date;
  private mail : string;
  private password : string;
  private gender : string;
  private pictures : string[];
  private size : number;
  private train_number: number;
  private car_number: number;
  private description: string;
  private messagesSended: string[];
  private messagesReceived: string[];
  private likesSended: string[];
  private likesReceived: string[];

    constructor(id:number, firstname:string, lastname:string, pseudo:string ,
      date_Of_Birth:Date, mail:string, password:string, gender:string,
      pictures:string[], size:number, train_number:number, car_number:number, description:string,
      messagesSended:string[], messagesReceived: string[], likesSended:string[], likesReceived:string[]){
      this.id = id;
      this.firstname = firstname;
      this.lastname = lastname;
      this.pseudo = pseudo;
      this.date_Of_Birth = date_Of_Birth;
      this.mail = mail;
      this.password = password;
      this.gender = gender;
      this.pictures = pictures;
      this.size = size;
      this.train_number = train_number;
      this.car_number = car_number;
      this.messagesSended = messagesSended;
      this.messagesReceived = messagesReceived;
      this.likesSended = likesSended;
      this.likesReceived = likesReceived;
    }

    sendLikes(){

    }

    getLikes(){

    }

    sendMessages(){

    }

    getMessages(){

    }

    getFirstname() : string{
      return this.firstname;
    }

    setFirstname(firstname : string) : void {
      this.firstname = firstname;
    }

    getLastname() : string{
      return this.lastname;
    }

    setLastname(lastname : string) : void{
      this.lastname = lastname;
    }

    getPseudo() : string{
      return this.pseudo;
    }

    setPseudo(pseudo : string) : void{
      this.pseudo = pseudo;
    }

    getDateOfBirth() : Date{
      return this.date_Of_Birth;
    }

    setDateOfBirth(date_Of_Birth : Date){
      this.date_Of_Birth = date_Of_Birth;
    }

    getMail() : string{
      return this.mail;
    }

    setMail(mail : string){
      this.mail = mail;
    }

    getPassword() : string{
      return this.password;
    }

    setPassword(password : string){
      this.password = password;
    }

    getGender() : string{
      return this.gender;
    }

    setGender(gender : string){
      this.gender = gender;
    }

    getPhotos() : string[]{
      return this.photos;
    }

    addPhotos() : void{

    }

    getTall(){

    }

    setTall(){

    }
}
