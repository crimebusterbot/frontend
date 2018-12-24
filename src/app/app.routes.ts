import {ModuleWithProviders} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {LoginComponent} from './login/login.component';
import {LoggedInComponent} from './logged-in/logged-in.component';
import {CheckComponent} from './check/check.component';

import { AuthenticationService } from './_services/auth.service';

export const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: '', component: LoggedInComponent, canActivateChild: [AuthenticationService], children: [
      {path: 'check', component: CheckComponent},
      {path: '**', redirectTo: '/check'}
    ]},
  {path: '**', component: LoggedInComponent}
];

export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);
