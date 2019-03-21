import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from "../dashboard/dashboard.component";
import {IngresoEgresoComponent} from "./ingreso-egreso.component";
import {EstadisticaComponent} from "./estadistica/estadistica.component";
import {DetalleComponent} from "./detalle/detalle.component";
import {OrdenIngresoEgresoPipe} from "./pipe/orden-ingreso-egreso.pipe";
import {ReactiveFormsModule} from "@angular/forms";
import {ChartsModule} from "ng2-charts";
import {SharedModule} from "../shared/shared.module";
import {DashboardRoutingModule} from "../dashboard/dashboard-routing.module";

@NgModule({
  declarations: [
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    ReactiveFormsModule,
    CommonModule,
    SharedModule,
    ChartsModule,
    DashboardRoutingModule
  ]
})
export class IngresoEgresoModule { }
