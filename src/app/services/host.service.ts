import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HostService {

  public host = "http://localhost:8080";

  constructor() { }

}
