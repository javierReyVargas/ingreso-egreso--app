import { Injectable } from '@angular/core';
import {IngresoEgreso} from './ingreso-egreso.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  constructor(private aFDB: AngularFirestore,
              private authService: AuthService) { }

  public crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {

    const  user = this.authService.getUsuario();

    return this.aFDB.doc( `${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }
}
