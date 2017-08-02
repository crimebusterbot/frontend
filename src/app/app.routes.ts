import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MapComponent} from './map/map.component';
import {AnalyticsComponent} from './analytics/analytics.component';

export const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: '**', component: MapComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
