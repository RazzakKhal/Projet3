import { JsonPipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {

  user: any;
  constructor(private router: Router, private authService: AuthService) {
    this.authService.getUserConnected()
      .then(reponse => reponse.json())
      .then(data => this.user = data)
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // je peux retourner true si l'utilisateur est un admin
    // return this.router.navigate(['']); // sinon je redirige

    if (this.user.role === "ADMIN") {
      return true;

    } else return this.router.navigate(['']);

  }


}
