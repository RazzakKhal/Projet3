export class User {

  private firstname : string;
  private lastname : string;
  private pseudo : string;
  private date_Of_Birth : Date;
  private mail : string;
  private password : string;
  private gender : string;
  private photos : string[];
  private tall : number;


    constructor(firstname : string, lastname:string, pseudo:string , date_Of_Birth:Date, mail:string, password:string, gender:string, photos : string[], tall : number){
      this.firstname = firstname;
      this.lastname = lastname;
      this.pseudo = pseudo;
      this.date_Of_Birth = date_Of_Birth;
      this.mail = mail;
      this.password = password;
      this.gender = gender;
      this.photos = photos;
      this.tall = tall;
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
