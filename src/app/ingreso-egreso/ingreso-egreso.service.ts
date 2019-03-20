import { Injectable } from '@angular/core';
import {IngresoEgreso} from './ingreso-egreso.model';
import {AngularFirestore} from '@angular/fire/firestore';
import {AuthService} from '../auth/auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {filter, map} from 'rxjs/operators';
import {SetItemsAction, UnsetItemsAction} from './ingreso-egreso.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IngresoEgresoService {

  public ingresoEgresoListenerSubscription: Subscription = new Subscription();
  public ingresoEgresoItemsSubscription: Subscription = new Subscription();

  constructor(private aFDB: AngularFirestore,
              private authService: AuthService,
              private store: Store<AppState>) { }

  public crearIngresoEgreso( ingresoEgreso: IngresoEgreso ) {

    const  user = this.authService.getUsuario();

    return this.aFDB.doc( `${user.uid}/ingresos-egresos`)
      .collection('items').add({...ingresoEgreso});
  }

  public initIngresoEgresoListener() {

    this.ingresoEgresoListenerSubscription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user !== null )
      )
      .subscribe(
        (auth) => {
          this.ingresoEgresoItems(auth.user.uid);
        }
      );
  }

  private ingresoEgresoItems( uid: string) {

    this.ingresoEgresoItemsSubscription = this.aFDB.collection(`${ uid }/ingresos-egresos/items`)
      .snapshotChanges()
      .pipe(
        map(
          docData => {
            return docData.map( doc => {
              return{
                uid: doc.payload.doc.id,
                ...doc.payload.doc.data()
              };
            });
          }
        )
      )
      .subscribe( (coleccion: any[]) => {
        this.store.dispatch(new SetItemsAction(coleccion));
      });
  }


  public deleteEntryEgress( uid: string){

    const  user = this.authService.getUsuario();

    return this.aFDB.doc( `${ user.uid }/ingresos-egresos/items/${ uid }`)
      .delete();

  }

  public cancelarSubscriptions() {
    this.ingresoEgresoItemsSubscription.unsubscribe();
    this.ingresoEgresoListenerSubscription.unsubscribe();

    this.store.dispatch(new UnsetItemsAction());
  }
}
