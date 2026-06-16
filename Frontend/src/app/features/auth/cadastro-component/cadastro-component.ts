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
    public dadosService: TimesService
  ) {
    this.cadastroForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      timeId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.dadosService.carregarTimesDoBackend();
  }

  onSubmit() {
    if (this.cadastroForm.valid) {
      const novoTorcedor = {
        email: this.cadastroForm.value.email,
        senha: this.cadastroForm.value.senha,
        timeId: this.cadastroForm.value.timeId
      };

      this.dadosService.cadastrarTorcedor(novoTorcedor).subscribe({
    next: () => {
      this.mensagemErro = '';
      this.mensagemSucesso = 'Torcedor cadastrado com sucesso! Redirecionando...';

    },
    error: (err) => {
  this.mensagemSucesso = '';


  if (err.status === 400) {
    this.mensagemErro = 'Este email já está cadastrado.';
    return;
  }

  this.mensagemErro = 'Erro ao realizar o cadastro. Tente novamente.';
}
  });
    }
  }
}
