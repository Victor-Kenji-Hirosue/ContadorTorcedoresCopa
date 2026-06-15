import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { TorcedoresComponent } from './torcedores-component/torcedores-component';
import { FooterComponent } from './footer-component/footer-component';
import { NavBarComponent } from './nav-bar-component/nav-bar-component';
import { TimesComponent } from './times-component/times-component';
import { LoginComponent } from './features/auth/login-component/login-component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';


@NgModule({
  declarations: [
    App,
    TorcedoresComponent,
    FooterComponent,
    NavBarComponent,
    TimesComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,

    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatMenuModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,

    NgbModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
