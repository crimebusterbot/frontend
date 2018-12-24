import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {DatePipe} from '@angular/common';

import {Routing} from './app.routes';

import {ChartsModule} from 'ng2-charts';

import {DataService} from './_services/data.service';
import {LogService} from './_services/log.service';

import {ReadableTimePipe} from './_pipes/readable-time.pipe';

import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopmenuComponent} from './topmenu/topmenu.component';

import { LoginComponent } from './login/login.component';
import { LoggedInComponent } from './logged-in/logged-in.component';
import { CheckComponent } from './check/check.component';
import {AuthenticationService} from './_services/auth.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TokenInterceptor} from './_services/token.service';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopmenuComponent,
    ReadableTimePipe,
    LoginComponent,
    LoggedInComponent,
    CheckComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    FormsModule,
    ReactiveFormsModule,
    Routing,
    HttpClientModule
  ],
  providers: [
    DataService,
    LogService,
    DatePipe,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
