import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import * as fromIngresoEgreso from "../ingreso-egreso.reducer";
import {Subscription} from "rxjs";
import {IngresoEgreso} from "../ingreso-egreso.model";
import {
  Label,
  MultiDataSet
} from "ng2-charts";

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styles: []
})
export class EstadisticaComponent implements OnInit, OnDestroy {

  public ingresos: number;
  public egresos: number;

  public countIngresos: number;
  public countEgresos: number;

  private subscription: Subscription = new Subscription();


  public doughnutChartLabels: Label[] = ['Ingresos', 'Egresos'];
  public doughnutChartData: MultiDataSet = [];

  constructor(private store: Store<fromIngresoEgreso.AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ingresoEgreso')
      .subscribe(dataItems => {
        this.countEntryEgress(dataItems.items);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  private countEntryEgress(items: IngresoEgreso[]): void {

    this.ingresos = 0;
    this.egresos = 0;


    this.countEgresos = 0;
    this.countIngresos = 0;

    items.forEach( item => {

      if (item.tipo === 'ingreso'){
        this.countIngresos ++;
        this.ingresos += item.monto;
      } else {
        this.countEgresos ++;
        this.egresos += item.monto;
      }

    });

    this.doughnutChartData = [
      [this.ingresos, this.egresos]
    ]


  }
}
