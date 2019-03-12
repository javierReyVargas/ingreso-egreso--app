import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngresoEgreso} from './ingreso-egreso.model';
import {IngresoEgresoService} from './ingreso-egreso.service';
import Swal from 'sweetalert2';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {Subscription} from 'rxjs';
import {ActivarLoadingAction, CerrarLoadingAction} from '../shared/ui.actions';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit, OnDestroy {

  forma: FormGroup;
  tipo = 'ingreso';

  public loadingSubscription: Subscription = new Subscription();
  public cargando: boolean;

  constructor(private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.loadingSubscription = this.store.select('ui')
      .subscribe(
        (ui) => {
          this.cargando = ui.isLoading;
      }
    );
    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required ),
      monto: new FormControl(0, Validators.min(0) )
    });
  }

  ngOnDestroy(): void {
    this.loadingSubscription.unsubscribe();
  }

  public crearIngresoEgreso() {

    this.store.dispatch(new ActivarLoadingAction());

    const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});

    this.ingresoEgresoService.crearIngresoEgreso( ingresoEgreso )
      .then(
        () => {
          this.store.dispatch( new CerrarLoadingAction());
          Swal('Creado', ingresoEgreso.descripcion, 'success');
          this.forma.reset({ monto: 0 });
        }
      )
      .catch(
        ( error ) => {
          Swal('Error en el registro', error.message, 'error');
        }
      );


  }

}
