import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {IngresoEgreso} from './ingreso-egreso.model';

@Component({
  selector: 'app-ingreso-egreso',
  templateUrl: './ingreso-egreso.component.html',
  styles: []
})
export class IngresoEgresoComponent implements OnInit {

  forma: FormGroup;
  tipo = 'ingreso';

  constructor() { }

  ngOnInit() {
    this.forma = new FormGroup({
      descripcion: new FormControl('', Validators.required ),
      monto: new FormControl(0, Validators.min(0) )
    });
  }

  public crearIngresoEgreso() {

    const ingresoEgreso = new IngresoEgreso({...this.forma.value, tipo: this.tipo});
    console.log(ingresoEgreso);
  }

}
