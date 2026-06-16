import { computed, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class TimesService {
  _termoBusca = signal<string>('');
  timeSelecionado: any = null;
  private listaDeTimesDoBanco = signal<any[]>([]);
  public getListaDeTimesDoBanco(): any[] {
     return this.listaDeTimesDoBanco();
  }
  get torcedorLogado(): any {
    const dados = localStorage.getItem('torcedorLogado');
    return dados ? JSON.parse(dados) : null;
  }
  set torcedorLogado(usuario: any) {
    if (usuario) {
      localStorage.setItem('torcedorLogado', JSON.stringify(usuario));
    } else {
      localStorage.removeItem('torcedorLogado');
    }
  }

  get termoPesquisa(): string { return this._termoBusca(); }
  set termoPesquisa(valor: string) { this._termoBusca.set(valor); }

  private API_URL = 'http://localhost:8080/api/times';
  private LOGIN_URL = 'http://localhost:8080/api/torcedores/login';
  private CADASTRO_URL = 'http://localhost:8080/api/torcedores';
   private MUDAR_TIME_URL = 'http://localhost:8080/api/torcedores';

  constructor(private http: HttpClient) {
    this.carregarTimesDoBackend();
  }

  carregarTimesDoBackend() {
    this.http.get<any[]>(this.API_URL).subscribe({
      next: (dados) => this.listaDeTimesDoBanco.set(dados),
      error: (err) => console.error('Erro ao conectar com o H2:', err)
    });
  }

  fazerLogin(credenciais: any): Observable<any> {
    return new Observable(observer => {
      this.http.post<any>(this.LOGIN_URL, credenciais).subscribe({
        next: (usuarioLogado) => {

          if (usuarioLogado) {
            usuarioLogado.id = usuarioLogado.id || usuarioLogado.idTorcedor || usuarioLogado.userId;
          }
          this.torcedorLogado = usuarioLogado;
          observer.next(usuarioLogado);
          observer.complete();
        },
        error: (err) => observer.error(err)
      });
    });
  }

  cadastrarTorcedor(dadosTorcedor: any): Observable<any> {
  return this.http.post<any>(this.CADASTRO_URL, dadosTorcedor);
}

  get obterTimeDoTorcedorLogado(): string {
    if (this.torcedorLogado && this.torcedorLogado.nomeTime) {
      return this.torcedorLogado.nomeTime;
    }
    return 'Nenhum time selecionado';
  }

  todosOsTimes = computed(() => {
  return this.listaDeTimesDoBanco();
  });

  timesFiltrados = computed(() => {
    const times = this.listaDeTimesDoBanco();
    const termo = this._termoBusca().toLowerCase();

    return times.filter(time => {
      const nomeTime = time.name ? time.name.toLowerCase() : '';
      const faseTime = time.fase ? time.fase.toLowerCase() : '';

      return nomeTime.includes(termo) || faseTime.includes(termo);
    });
  });
}
