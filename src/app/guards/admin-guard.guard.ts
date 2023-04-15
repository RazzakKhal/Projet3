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

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    // je peux retourner true si l'utilisateur est un admin

    return this.authService.getUserConnected()
      .then(reponse => reponse.json())
      .then((data) => {
        this.user = data;

        if (this.user.role === "USER") {
          return true;
          // sinon je redirige return this.router.navigate(['myProfil']); // 
        } else
          return this.router.navigate(['/myProfil']);
      })

      .catch(() => this.router.navigate(['/myProfil'])
      );


  }


}
