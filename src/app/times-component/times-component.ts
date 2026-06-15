import { Component } from '@angular/core';

@Component({
  selector: 'app-times-component',
  standalone: false,
  templateUrl: './times-component.html',
  styleUrl: './times-component.css',
})
export class TimesComponent {
  termoBusca: string = '';
  timeSelecionado: string = '';

  listaDeTimes = [
    { nome: 'Brasil', fase: 'Fase 1',torcedores: 12000000, icone: 'star' },
    { nome: 'Haiti', fase: 'Fase 1',torcedores: 12000000, icone: 'emoji_events' },
    { nome: 'Marrocos', fase: 'Fase 1',torcedores: 12000000, icone: 'local_fire_department' },
    { nome: 'Japão', fase: 'Fase 1',torcedores: 12000000, icone: 'auto_awesome' },
    { nome: 'França', fase: 'Fase 1',torcedores: 12000000, icone: 'auto_awesome' }
  ];

  selecionarTime(nomeDoTime: string) {
    this.timeSelecionado = nomeDoTime;
  }

  salvarTimeSelecionado() {
    if (this.timeSelecionado) {
      localStorage.setItem('timeSelecionado', this.timeSelecionado);
    }
  }

  get timesFiltrados() {
    return this.listaDeTimes.filter(time =>
      time.nome.toLowerCase().includes(this.termoBusca.toLowerCase()) ||
      time.fase.toLowerCase().includes(this.termoBusca.toLowerCase())
    );
  }

}
