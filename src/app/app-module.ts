import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TorcedoresComponent } from './torcedores-component/torcedores-component';
import { HomeComponent } from './home-component/home-component';
import { Footer } from './footer/footer';
import { NavBar } from './nav-bar/nav-bar';
import { FooterComponent } from './footer-component/footer-component';
import { NavBarComponent } from './nav-bar-component/nav-bar-component';

@NgModule({
  declarations: [
    App,
    TorcedoresComponent,
    HomeComponent,
    Footer,
    NavBar,
    FooterComponent,
    NavBarComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, NgbModule],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
