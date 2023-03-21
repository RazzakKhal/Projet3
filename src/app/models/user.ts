export class User {
  private firstname : string;
  private lastname : string;
  private pseudo : string;
  private date_of_birth : Date;
  private mail : string;
  private password : string;
  private gender : string;
    constructor(firstname : string, lastname:string, pseudo:string , date_of_birth:Date, mail:string, password:string, gender:string){
      this.firstname = firstname;
      this.lastname = lastname;
      this.pseudo = pseudo;
      this.date_of_birth = date_of_birth;
      this.mail = mail;
      this.password = password;
      this.gender = gender;
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
      return this.date_of_birth;
    }
    setDateOfBirth(date_of_birth : Date){
      this.date_of_birth = date_of_birth;
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

    getId():number | undefined{
      return this.id;
    }
}