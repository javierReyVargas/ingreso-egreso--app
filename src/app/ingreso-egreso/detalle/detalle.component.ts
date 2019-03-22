import {Component, OnDestroy, OnInit} from '@angular/core';
import {Store} from '@ngrx/store';
import {IngresoEgreso} from '../ingreso-egreso.model';
import {Subscription} from 'rxjs';
import {IngresoEgresoService} from '../ingreso-egreso.service';
import Swal from 'sweetalert2';
import * as fromIngresoEgreso from '../ingreso-egreso.reducer'
@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styles: []
})
export class DetalleComponent implements OnInit, OnDestroy{

  public listEntryAndEgress: IngresoEgreso[] = [];
  private listDetailSubscription: Subscription = new Subscription();

  constructor( private store: Store<fromIngresoEgreso.AppState>,
               private ingresoEgresoService: IngresoEgresoService) { }

  ngOnInit() {
    this.getAllEntryAndEgress();
  }

  ngOnDestroy(): void {
    this.listDetailSubscription.unsubscribe();
  }

  private getAllEntryAndEgress(): void {
    this.store.select('ingresoEgreso').subscribe(
      (response) => {
        this.listEntryAndEgress = response.items;
      }
    );
  }

  public delteItem( item: IngresoEgreso): void {
    this.ingresoEgresoService.deleteEntryEgress( item.uid )
      .then(
        () => {
          Swal('Eliminado', item.descripcion, 'success');
        }
      );
  }
}
