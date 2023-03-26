import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GalerieGuard implements CanActivate {
  constructor(private router:Router){

  }


  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    // si il est connecté localStorage.getItem('token')

    //et qu'il a une photo
    return true;
    //sinon 
    
      // return this.router.navigate(['/myProfil']);
  }
  
}
