import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MyProfilComponent } from './my-profil/my-profil.component';
import { GalerieComponent } from './galerie/galerie.component';
import { OtherProfilComponent } from './other-profil/other-profil.component';
import { TchatComponent } from './tchat/tchat.component';
import { AdminInterfaceComponent } from './admin-interface/admin-interface.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    MyProfilComponent,
    GalerieComponent,
    OtherProfilComponent,
    TchatComponent,
    AdminInterfaceComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
