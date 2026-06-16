import { Component } from "@angular/core";
import { TimesService } from "./times-service";

@Component({
  selector: 'app-times-component',
  standalone: false,
  templateUrl: './times-component.html',
  styleUrl: './times-component.css',
})
export class TimesComponent{
  constructor(public dadosService: TimesService){}
}
