import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {AuthService} from "../../auth/auth.service";
import {Store} from "@ngrx/store";
import {AppState} from "../../app.reducer";
import {filter} from "rxjs/operators";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit, OnDestroy {

  public name: string;

  private subcription: Subscription = new Subscription();

  constructor(private store: Store<AppState>) { }

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

}
