import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { GalerieComponent } from './galerie/galerie.component';
import { TchatComponent } from './tchat/tchat.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';

const routes: Routes = [
  {path:'', component : AccueilComponent},
  {path:'myProfil', component : MyProfilComponent},
  {path:'galerie', component : GalerieComponent},
  {path:'messagerie', component : TchatComponent},
  {path:'admin', component : AdminInterfaceComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
