import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';
import {Routing} from './app.routes';

import {AgmCoreModule} from '@agm/core';
import {ChartsModule} from 'ng2-charts';

import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopmenuComponent} from './topmenu/topmenu.component';
import {MapComponent} from './map/map.component';

import {DataService} from './_services/data.service';
import {LogService} from './_services/log.service';
import {AnalyticsComponent} from './analytics/analytics.component';
import {AveragetrashComponent} from './charts/averagetrash/averagetrash.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopmenuComponent,
    MapComponent,
    AnalyticsComponent,
    AveragetrashComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAQGPLoSMSsvmkhObuh6ja2uJNeRJXWiVI'
    }),
    Routing,
    HttpModule
  ],
  providers: [DataService, LogService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
