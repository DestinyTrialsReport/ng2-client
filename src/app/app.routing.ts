/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import {ReportComponent} from "./containers/report.component";
import {MapsComponent} from "./containers/maps.component";

export const routes: Routes = [
  { path: '', component: MapsComponent },
  { path: 'ps/:player1', component: ReportComponent },
  { path: '**', component: NotFound404Component }
];
