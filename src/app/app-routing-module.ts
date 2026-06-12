import { LoginComponent } from './login-component/login-component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TorcedoresComponent } from './torcedores-component/torcedores-component';
import { TimesComponent } from './times-component/times-component';

const routes: Routes = [
  {path: '', component: LoginComponent},
  {path: 'torcedores', component: TorcedoresComponent},
  {path: 'times', component: TimesComponent},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
