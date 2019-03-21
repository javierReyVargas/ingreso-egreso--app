import {Component, OnInit} from '@angular/core';
import {IngresoEgresoService} from '../ingreso-egreso/ingreso-egreso.service';
import {Store} from "@ngrx/store";
import {AppState} from "../app.reducer";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit{

  constructor( private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.ingresoEgresoService.initIngresoEgresoListener();
  }


}
