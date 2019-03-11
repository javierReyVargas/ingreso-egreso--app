import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducer';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: []
})
export class RegisterComponent implements OnInit, OnDestroy {

  load: boolean;
  subscription: Subscription = new Subscription();

  constructor(private serviceAuth: AuthService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subscription = this.store.select('ui').subscribe(
      (uiData) => {
        this.load = uiData.isLoading;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  public onSubmit(data: any) {
    this.serviceAuth.register(data.name, data.email, data.password);
  }

}
