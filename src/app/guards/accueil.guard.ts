import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccueilGuard implements CanActivate {
  constructor(private router: Router) {}
  canActivate(

    // si l'utilisateur est connecté , il peut pas acceder a l'accueil
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    if (localStorage.getItem("TokenSauvegarde") !== null)
    {
      return this.router.navigate(['/myProfil']);
    }
    
      return true;
  }
  
}
