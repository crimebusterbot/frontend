import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {MapComponent} from './map/map.component';
import {RouteComponent} from './route/route.component';
import {HeatmapComponent} from './heatmap/heatmap.component';
import {AnalyticsComponent} from './analytics/analytics.component';
import {DetailsComponent} from './details/details.component';
import {RoutestepsComponent} from './routesteps/routesteps.component';

export const routes: Routes = [
  {path: 'map', component: MapComponent},
  {path: 'route', component: RouteComponent},
  {path: 'analytics', component: AnalyticsComponent},
  {path: 'heatmap', component: HeatmapComponent},
  {path: 'routesteps', component: RoutestepsComponent},
  {path: 'map/:id', component: DetailsComponent},
  {path: '', redirectTo: '/map', pathMatch: 'full'},
  {path: '**', component: MapComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
