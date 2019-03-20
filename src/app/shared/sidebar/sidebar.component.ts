import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from '../../auth/auth.service';
import {IngresoEgresoService} from "../../ingreso-egreso/ingreso-egreso.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {Subscription} from "rxjs";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit, OnDestroy {

  public name: string;

  private subcription: Subscription = new Subscription();

  constructor(public auth: AuthService,
              private ingresoEgresoService: IngresoEgresoService,
              private store: Store<AppState>) { }

  ngOnInit() {
    this.subcription = this.store.select('auth')
      .pipe(
        filter( auth => auth.user !== null)
      )
      .subscribe( auth => this.name = auth.user.name);
  }
  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }

  public logOut() {
    this.auth.logout();
    this.ingresoEgresoService.cancelarSubscriptions();
  }

}
