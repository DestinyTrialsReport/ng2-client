/* tslint:disable: max-line-length */
import { Routes } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { NotFound404Component } from './components/notfound404/notfound404.component';
import { ReportComponent } from "./components/report/report.component";
import { MyReportComponent } from "./components/my-report/my-report.component";
import {LeaderboardsComponent} from "./components/leaderboards/leaderboards.component";
import {MapsComponent} from "./components/maps/maps.component";

export function isSubdomain(name: string): boolean {
  let segments = window.location.hostname.split('.');
  let subdomain = segments.length > 2 ? segments[segments.length - 3].toLowerCase() : null;
  return name != subdomain;
}

export const routes: Routes = [
  { path: '', component: HomeComponent },
  // { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'leaderboards', component: LeaderboardsComponent },
  // { path: 'ps/:player1', component: isSubdomain('my') ? ReportComponent : ReportComponent, data: { platform: 2 } },
  { path: 'ps/:player1', component: ReportComponent, data: { platform: 2 } },
  // { path: 'ps/:player1', component: ReportComponent, data: { platform: 2 } },
  { path: 'xbox/:player1', component: ReportComponent, data: { platform: 1 } },
  { path: '**', component: NotFound404Component }
];
