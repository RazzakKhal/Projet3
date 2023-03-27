import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/core';

@Injectable({
  providedIn: 'root'
})

//ce service fait appel à l'API
export class AuthService {

url ="http://localhost:8888/auth/login"

//j 'injecte mon service dans le constructor
  constructor(private http: HttpClient){ }

  login(password : any){
   return this.http.post(this.url, password)
  }
}
