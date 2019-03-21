import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*
* ngrx
* */
import {StoreModule} from '@ngrx/store';
import {appReducers} from './app.reducer';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';


/*
* chart js
* */
import { ChartsModule } from 'ng2-charts';

/*
* modules
* */
import {AppRoutingModule} from './app.routing.module';
import {ReactiveFormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFirestoreModule, FirestoreSettingsToken} from '@angular/fire/firestore';
import {environment} from '../environments/environment';




import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IngresoEgresoComponent } from './ingreso-egreso/ingreso-egreso.component';
import { EstadisticaComponent } from './ingreso-egreso/estadistica/estadistica.component';
import { DetalleComponent } from './ingreso-egreso/detalle/detalle.component';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { OrdenIngresoEgresoPipe } from './ingreso-egreso/pipe/orden-ingreso-egreso.pipe';
import {AuthModule} from './auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    IngresoEgresoComponent,
    EstadisticaComponent,
    DetalleComponent,
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    OrdenIngresoEgresoPipe
  ],
  imports: [
    BrowserModule,
    AuthModule,
    AppRoutingModule,
    ReactiveFormsModule,
    ChartsModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument(
      {
        maxAge: 25,
        logOnly: environment.production
      }
    ),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule
  ],
  providers: [{ provide: FirestoreSettingsToken, useValue: {}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
