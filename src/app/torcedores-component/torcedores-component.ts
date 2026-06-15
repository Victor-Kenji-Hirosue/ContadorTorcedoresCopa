import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-torcedores-component',
  standalone: false,
  templateUrl: './torcedores-component.html',
  styleUrl: './torcedores-component.css',
})
export class TorcedoresComponent implements OnInit, AfterViewInit {

  timeSelecionado: string = '';

  selecionarTime(nomeDoTime: string) {
    this.timeSelecionado = nomeDoTime;
  }

  colunasExibidas: string[] = ['bandeira', 'nome', 'fase', 'torcedores'];

  listaDeTimes = [
    { nome: 'Brasil', fase: 'Fase 1',torcedores: 8000000, icone: 'star' },
    { nome: 'Haiti', fase: 'Fase 1',torcedores: 12000000, icone: 'emoji_events' },
    { nome: 'Marrocos', fase: 'Fase 1',torcedores: 12000000, icone: 'local_fire_department' },
    { nome: 'Japão', fase: 'Fase 1',torcedores: 12000000, icone: 'auto_awesome' },
    { nome: 'França', fase: 'Fase 1',torcedores: 16000000, icone: 'auto_awesome' }
  ];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
   this.dataSource.data = this.listaDeTimes;
  }

   ngAfterViewInit() {
    // Conecta o robô de ordenação à nossa fonte de dados
    this.dataSource.sort = this.sort;

    // Configura para que a coluna de torcedores já comece do MAIOR para o MENOR
    this.sort.sort({ id: 'torcedores', start: 'desc', disableClear: false });
  }
}
