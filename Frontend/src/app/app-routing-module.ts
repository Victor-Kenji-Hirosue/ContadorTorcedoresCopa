
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TorcedoresComponent } from './torcedores-component/torcedores-component';
import { TimesComponent } from './times-component/times-component';
import { LoginComponent } from './features/auth/login-component/login-component';
import { CadastroComponent } from './features/auth/cadastro-component/cadastro-component';

const routes: Routes = [
  { path: '', redirectTo: 'auth/login', pathMatch: 'full' },
  {path: 'auth/login', component: LoginComponent},
  {path: 'torcedores', component: TorcedoresComponent},
  {path: 'time', component: TimesComponent},
  { path: 'auth/cadastro', component: CadastroComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
