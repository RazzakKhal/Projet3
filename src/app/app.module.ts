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
import { ProfilCardComponent } from './profil-card/profil-card.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LikeComponent } from './like/like.component';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    MyProfilComponent,
    GalerieComponent,
    OtherProfilComponent,
    TchatComponent,
    AdminInterfaceComponent,
    HeaderComponent,
    ProfilCardComponent,
    FooterComponent,
    LikeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }