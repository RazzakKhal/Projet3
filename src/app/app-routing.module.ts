import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { GalerieComponent } from './galerie/galerie.component';
import { TchatComponent } from './tchat/tchat.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { OtherProfilComponent } from './other-profil/other-profil.component';
import { AdminGuardGuard } from './guards/admin-guard.guard';
import { GalerieGuard } from './guards/galerie.guard';
import { AccueilGuard } from './guards/accueil.guard';
import { MessagerieGuard } from './guards/messagerie.guard';
import { MyProfilGuard } from './guards/my-profil.guard';
import { LikeGuard } from './guards/like.guard';
import { LikeComponent } from './like/like.component';


const routes: Routes = [
  {path:'', component : AccueilComponent, canActivate:[AccueilGuard]},
  {path:'myProfil', component : MyProfilComponent, canActivate:[MyProfilGuard]},
  {path:'galerie', component : GalerieComponent, canActivate:[GalerieGuard]},
  {path:'like', component : LikeComponent, canActivate:[LikeGuard]},
  {path:'messagerie/:id', component : TchatComponent, canActivate:[MessagerieGuard]},
  {path:'admin', component : AdminInterfaceComponent, canActivate:[AdminGuardGuard]},
  {path:'other-profil/:id', component : OtherProfilComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
