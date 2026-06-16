import { AfterViewInit, Component, ViewChild, effect } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { TimesService } from '../times-component/times-service';

@Component({
  selector: 'app-torcedores-component',
  standalone: false,
  templateUrl: './torcedores-component.html',
  styleUrl: './torcedores-component.css',
})
export class TorcedoresComponent implements AfterViewInit {

  timeSelecionado: string = '';

  selecionarTime(nomeDoTime: string) {
    this.timeSelecionado = nomeDoTime;
  }

  colunasExibidas: string[] = ['bandeira', 'nome', 'fase', 'torcedores'];

  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dadosService: TimesService) {
    effect(() => {
      const times = this.dadosService.todosOsTimes();

      const timesOrdenados = [...times].sort((a, b) => {
        const torcedoresA = a.quantidadeTorcedores || 0;
        const torcedoresB = b.quantidadeTorcedores || 0;
        return torcedoresB - torcedoresA; // Maior para o menor
      });

      this.dataSource.data = timesOrdenados;

      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }
   ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  selecionar(nomeDoTime: string) {
    this.dadosService.timeSelecionado = nomeDoTime;
  }
}
