import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-times-component',
  standalone: false,
  templateUrl: './times-component.html',
  styleUrl: './times-component.css',
})
export class TimesComponent {
  _termoBusca: string = '';
  timeSelecionado: string = '';
  listaDeTimesDoBanco: any[] = [];

  private API_URL = 'http://localhost:8080/api/times';

  constructor(private http: HttpClient) {
    this.carregarTimesDoBackend();
  }

  // Faz a chamada GET para o Spring Boot
  carregarTimesDoBackend() {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (dados) => {
        this.listaDeTimesDoBanco = dados;
      },
      error: (err) => console.error('Erro ao conectar com o banco H2:', err)
    });
  }

  get termoPesquisa(): string { return this._termoBusca; }
  set termoPesquisa(valor: string) { this._termoBusca = valor; }

  selecionarTime(nomeDoTime: string) {
    this.timeSelecionado = nomeDoTime;
  }

  salvarTimeSelecionado() {
    if (this.timeSelecionado) {
      localStorage.setItem('timeSelecionado', this.timeSelecionado);
    }
  }

  get timesFiltrados() {
    return this.listaDeTimesDoBanco.filter(time =>
      time.nome.toLowerCase().includes(this.termoPesquisa.toLowerCase()) ||
      time.cidade.toLowerCase().includes(this.termoPesquisa.toLowerCase())
    );
  }
}
