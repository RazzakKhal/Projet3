import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

//ce service fait appel à l'API
export class AuthService {
  getUserDetails() {
    throw new Error('Method not implemented.');
  }

url ="http://localhost:8080/auth";

//j 'injecte mon service dans le constructor
  constructor(private http: HttpClient){ }

  login(password : any){
   return this.http.post(this.url, password)
  }


}
