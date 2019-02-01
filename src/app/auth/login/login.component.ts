import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit, OnDestroy {

  load: boolean;
  subcription: Subscription;
  constructor(private authService: AuthService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subcription = this.store.select('ui').subscribe(
      (ui) => {
        this.load = ui.isLoading;
      }
    );
  }

  ngOnDestroy() {
    this.subcription.unsubscribe();
  }

  public onSubmit( data: any ) {
    this.authService.login(data.email, data.password);
  }

}
