
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TorcedoresComponent } from './torcedores-component/torcedores-component';
import { TimesComponent } from './times-component/times-component';
import { LoginComponent } from './features/auth/login-component/login-component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {path: 'auth/login', component: LoginComponent},
  {path: 'torcedores', component: TorcedoresComponent},
  {path: 'times', component: TimesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
