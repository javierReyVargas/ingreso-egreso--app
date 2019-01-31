import {Injectable} from '@angular/core';
import {AngularFireAuth} from '@angular/fire/auth';
import {AngularFirestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import * as firebase from 'firebase';
import Swal from 'sweetalert2';
import {map} from 'rxjs/operators';
import {User} from './user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
              private router: Router,
              private afDB: AngularFirestore) {
  }

  public initAuthListener() {
    this.afAuth.authState.subscribe(
      (userFb: firebase.User) => {
        console.log(userFb);
      });
  }

  public register(name: string, email: string, password: string) {
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
      }
    ).catch(
      (error) => {
        console.error(error);
        Swal('Error en el registro', error.message, 'error');
      }
    );
  }

  public login(email: string, password: string) {
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (response) => {
        this.router.navigate(['/']);
      }
    ).catch(
      (error) => {
        console.error(error);
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
