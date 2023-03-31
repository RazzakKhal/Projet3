import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MyProfilGuard implements CanActivate {

  constructor(private router: Router) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // si l'user n'est pas connecté, on à accès qu'à la page accueil
    if (localStorage.getItem("TokenSauvegarde") === null) {
      return this.router.navigate(['']);
    } // sinon on à accès à la page myProfil grâce à mon guard :D 
    return true;
  }

}


