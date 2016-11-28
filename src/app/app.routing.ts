/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NotFound404Component } from './components/notfound404/notfound404.component';
import { ReportComponent } from "./components/report/report.component";

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'ps/:player1', component: ReportComponent, data: { platform: 2 } },
  { path: 'xbox/:player1', component: ReportComponent, data: { platform: 1 } },
  { path: '**', component: NotFound404Component }
];
