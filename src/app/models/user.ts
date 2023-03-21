import { Like } from "./like";
import { Message } from "./message";
import { Picture } from "./picture";


>>>>>>> 9bddb1f9660bd44dcf8b794b34a8be29845c82bb
export class User {
  private id: number | undefined;
  private firstname: string;
  private lastname: string;
  private pseudo: string;
  private date_of_birth: Date;
  private mail: string;
  private password: string;
  private gender: string;
  private pictures: Picture[]=[];
  private size: number = 0;
  private train_number: number = 0;
  private car_number: number = 0;
  private description: string = "";
  private messagesSended: Message[] = [];
  private messagesReceived: Message[] = [];
  private likesSended: Like[] = [];
  private likesReceived: Like[] = [];

  constructor(firstname: string, lastname: string, pseudo: string,
    date_of_birth: Date, mail: string, password: string, gender: string){

    this.firstname = firstname;
    this.lastname = lastname;
    this.pseudo = pseudo;
    this.date_of_birth = date_of_birth;
    this.mail = mail;
    this.password = password;
    this.gender = gender;
  }

  getId(): number | undefined{
    return this.id;
  }

  getFirstname(): string {
    return this.firstname;
  }

  setFirstname(firstname: string): void {
    this.firstname = firstname;
  }

  getLastname(): string {
    return this.lastname;
  }

  setLastname(lastname: string): void {
    this.lastname = lastname;
  }

  getPseudo(): string {
    return this.pseudo;
  }

  setPseudo(pseudo: string): void {
    this.pseudo = pseudo;
  }

  getDateOfBirth(): Date {
    return this.date_of_birth;
  }

  setDateOfBirth(date_of_birth: Date) {
    this.date_of_birth = date_of_birth;
  }

  getMail(): string {
    return this.mail;
  }

  setMail(mail: string) {
    this.mail = mail;
  }

  getPassword(): string {
    return this.password;
  }

  setPassword(password: string) {
    this.password = password;
  }

  getGender(): string {
    return this.gender;
  }

  setGender(gender: string) {
    this.gender = gender;
  }

  getPictures(): Picture[] {
    return this.pictures;
  }
  setPictures(pictures: Picture[]) {
    this.pictures = pictures;
  }

  getLikesSended(): Like[] {
    return this.likesSended;
  }

  setLikesSended(likesSended: Like[]) {
    this.likesSended = likesSended;
  }
  getLikesReceived(): Like[] {
    return this.likesReceived;
  }

  setLikesReceived(likesReceived: Like[]) {
    this.likesReceived = likesReceived;
  }

  getMessagesSended(): Message[] {
    return this.messagesSended;
  }

  setMessagesSended(messagesSended: Message[]) {
    this.messagesSended = messagesSended;
  }
  getMessagesReceived(): Message[] {
    return this.messagesReceived;
  }

  setMessagesReceived(messagesReceived: Message[]) {
    this.messagesReceived = messagesReceived;
  }

  getSize(): number {
    return this.size;
  }

  setSize(size: number) {
    this.size = size;
  }

  getTrainNumber(): number {
    return this.train_number;
  }

  setTrainNumber(train_number: number) {
    this.train_number = train_number;
  }

  getCarNumber(): number {
    return this.car_number;
  }

  setCarNumber(car_number : number) {
    this.car_number = car_number;
  }

  getDescription() : string {
    return this.description;
  }

  setDescription(description : string) {
    this.description = description ;
  }
}
