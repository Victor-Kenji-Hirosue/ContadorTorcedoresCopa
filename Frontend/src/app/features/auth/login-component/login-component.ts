import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimesService } from '../../../times-component/times-service';


@Component({
  selector: 'app-login-component',
  standalone: false,
  templateUrl: './login-component.html',
  styleUrl: './login-component.css',

})
export class LoginComponent {
  loginForm: FormGroup;
   mensagemErro: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private dadosService: TimesService ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const credenciais = {
        email: this.loginForm.value.email,
        senha: this.loginForm.value.password
      };

      this.dadosService.fazerLogin(credenciais).subscribe({
        next: (usuarioLogado) => {
          console.log('Login aceito pelo H2 para:', usuarioLogado.nome);
          this.mensagemErro = '';
          this.router.navigate(['/time']);
        },
        error: (err) => {
          this.mensagemErro = err.error || 'Erro ao conectar com o servidor.';
        }
      });
    }
  }

}
