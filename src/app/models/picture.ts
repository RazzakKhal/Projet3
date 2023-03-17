import { User } from './user';

export class Picture {
  private id : number;
  private link : string;
  private user : User;

  constructor(link : string, user: User){
    this.link = link;
    this.user = user;
  }

  public getId() : number {
    return this.id;
  }

  public setId(id : number){
    this.id = id;
  }

  public getLink() : string {
    return this.link;
  }

  public setLink(link : string){
    this.link = link;
  }

  public getUser() : User{
    return this.user;
  }

  public setUser(user : User){
    this.user = user;
  }
}
