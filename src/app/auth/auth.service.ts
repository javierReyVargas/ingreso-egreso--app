import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import {User} from './user.model';
import {Store} from '@ngrx/store';
import {AppState} from '../app.reducer';
import {ActivarLoadingAction, CerrarLoadingAction} from '../shared/ui.actions';
import {SetUserAction} from './auth.actions';
import {Subscription} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubscription: Subscription = new Subscription();

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore,
              private store: Store<AppState>) {
  }

  public initAuthListener() {
    this.afAuth.authState.subscribe(
      (userFb: firebase.User) => {
        if (userFb) {
          this.userSubscription = this.afDB.doc(`${ userFb.uid }/usuario`).valueChanges()
            .subscribe(
              (usuarioObj) => {
                console.log(usuarioObj);
                const newUser = new User(usuarioObj);
                this.store.dispatch(new SetUserAction(newUser));
              }
            );
        } else {
          this.userSubscription.unsubscribe();
        }
      });
  }

  public register(name: string, email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.createUserWithEmailAndPassword(email, password).then(
      (response) => {
        const user: User = {
          uid: response.user.uid,
          name: name,
          email: response.user.email
        };
        this.afDB.doc(`${user.uid}/usuario`)
                 .set(user)
                 .then(() => {
                   this.router.navigate(['/']);
                 });
        this.router.navigate(['/']);
        this.store.dispatch(new CerrarLoadingAction());
      }
    ).catch(
      (error) => {
        console.error(error);
        this.store.dispatch(new CerrarLoadingAction());
        Swal('Error en el registro', error.message, 'error');
      }
    );
  }

  public login(email: string, password: string) {

    this.store.dispatch(new ActivarLoadingAction());

    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (response) => {
        this.store.dispatch(new CerrarLoadingAction());
        this.router.navigate(['/']);
      }
    ).catch(
      (error) => {
        console.error(error);
        this.store.dispatch(new CerrarLoadingAction());
        Swal('Error en el login', error.message, 'error');
      }
    );
  }

  public logout() {
    this.router.navigate(['/login']);
    this.afAuth.auth.signOut();
  }

  public isAuth() {
    return this.afAuth.authState
      .pipe(
        map(fbUser => {

          if (fbUser == null) {
            this.router.navigate(['/login']);
          }

          return fbUser  != null;
        })
      );
  }
}
