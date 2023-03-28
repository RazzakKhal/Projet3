import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalerieGuard implements CanActivate {
  constructor(private router: Router) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // si il n'est pas connecté l' envoie à l'accueil
    if (localStorage.getItem("TokenSauvegarde") === null) {
      return this.router.navigate(['']);
    }

    // sinon si il est connecté mais il n'a pas de photo
    // return this.router.navigate(['/myProfil']);

    // sinon on retourne true;


    return true;



  }


}
