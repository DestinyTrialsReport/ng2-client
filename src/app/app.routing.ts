/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';

import { NotFound404Component } from './not-found404.component';
import {ReportComponent} from "./containers/report.component";
import {AppResolver} from "./app.resolver";

export const routes: Routes = [
  { path: '', component: ReportComponent,
    resolve: {
      manifest: AppResolver
    }
  },
  { path: 'ps/:player1', component: ReportComponent,
    resolve: {
      manifest: AppResolver
    }
  },
  { path: '**', component: NotFound404Component }
];
