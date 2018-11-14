import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LoggedInComponent} from './logged-in/logged-in.component';
import {CheckComponent} from './check/check.component';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoggedInComponent, children: [
      {path: 'check', component: CheckComponent},
      {path: '**', component: CheckComponent}
    ]},
  {path: '**', component: LoggedInComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
