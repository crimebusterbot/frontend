import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpModule} from '@angular/http';

import {Routing} from './app.routes';

import {AgmCoreModule} from '@agm/core';
import {ChartsModule} from 'ng2-charts';

import {DataService} from './_services/data.service';
import {LogService} from './_services/log.service';

import {DirectionsMapDirective} from './_directives/agm-directions.directive';

import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TopmenuComponent} from './topmenu/topmenu.component';
import {MapComponent} from './map/map.component';
import {RouteComponent} from './route/route.component';

import {AnalyticsComponent} from './analytics/analytics.component';
import {TrashOverTimeSingleComponent} from './charts/trashovertime-single/trashovertime-single.component';
import {TrashOverTimeComponent} from './charts/trashovertime/trashovertime.component';
import {DetailsComponent} from './details/details.component';
import {HumidityOverTimeSingleComponent} from './charts/humidityovertime-single/humidityovertime-single.component';
import {MassOverTimeSingleComponent} from './charts/massovertime-single/massovertime-single.component';
import {TrashcanStatusBarComponent} from './charts/trashcanstatus-bar/trashcanstatus-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    TopmenuComponent,
    MapComponent,
    RouteComponent,
    AnalyticsComponent,
    TrashOverTimeSingleComponent,
    TrashOverTimeComponent,
    HumidityOverTimeSingleComponent,
    MassOverTimeSingleComponent,
    DetailsComponent,
    DirectionsMapDirective,
    TrashcanStatusBarComponent
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
