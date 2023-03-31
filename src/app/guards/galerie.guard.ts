import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class GalerieGuard implements CanActivate {
  MyUser: any
  constructor(private router: Router, private authService: AuthService) {

  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // si il n'est pas connecté l' envoie à l'accueil

    return this.authService.getUserConnected()
      .then(reponse => reponse.json())
      .then((data) => {
        this.MyUser = data;

        if (localStorage.getItem("TokenSauvegarde") === null) {
          return this.router.navigate(['']);
        }


        // sinon si il est connecté mais il n'a pas de photo
        // return this.router.navigate(['/myProfil']);
        else if (this.MyUser.pictures.length === 0) {
          return this.router.navigate(['/myProfil']);

        } // sinon on retourne true;
        return true;
      }

      )
      .catch(() => false);
  }
}
