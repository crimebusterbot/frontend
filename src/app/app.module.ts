import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
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
    Routing,
    HttpModule,
    HttpClientModule
  ],
  providers: [DataService, LogService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule {
}
