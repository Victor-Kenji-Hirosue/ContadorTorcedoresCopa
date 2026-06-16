import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TimesService } from '../../../times-component/times-service';

@Component({
  selector: 'app-cadastro',
  standalone: false,
  templateUrl: './cadastro-component.html',
  styleUrls: ['./cadastro-component.css']
})
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  mensagemErro: string = '';
  mensagemSucesso: string = '';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public dadosService: TimesService // Injeta o serviço público
  ) {
    // Definimos os campos obrigatórios do formulário
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      timeId: ['', [Validators.required]] // Campo para selecionar o ID do time
    });
  }

  ngOnInit(): void {
    // Garante que a lista de times do banco seja carregada para exibir no menu select
    this.dadosService.carregarTimesDoBackend();
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      // Monta os dados no formato exato esperado pelo Record 'TorcedorCadastroDTO' do Java
      const novoTorcedor = {
        email: this.cadastroForm.value.email,
        senha: this.cadastroForm.value.senha,
        timeId: this.cadastroForm.value.timeId
      };

      this.dadosService.cadastrarTorcedor(novoTorcedor).subscribe({
        next: (resposta) => {
          this.mensagemErro = '';
          this.mensagemSucesso = 'Torcedor cadastrado com sucesso! Redirecionando...';

          // Aguarda 2 segundos para o usuário ver o aviso de sucesso e o manda para o login
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000);
        },
        error: (err) => {
          this.mensagemSucesso = '';
          // Captura erros como e-mail já existente enviado pelo banco H2
          this.mensagemErro = err.error || 'Erro ao realizar o cadastro. Tente novamente.';
        }
      });
    }
  }
}
