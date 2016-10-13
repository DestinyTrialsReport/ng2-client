import { NotFound404Component } from './not-found404.component';
import {MapsComponent} from "./containers/maps.component";
import {WeaponUsageComponent} from "./components/weapon-usage.component";
import {WeaponGuardianComponent} from "./components/weapon-guardian.component";
import {QuickStats} from "./components/quick-stats.component";
import {PlayerComponent} from "./containers/player.component";
import {Emblem} from "./components/emblem.component";
import {ActivityChartComponent} from "./components/activities-chart.component";
import {ReportComponent} from "./containers/report.component";
import {ControlComponent} from "./containers/control.component";
import {WinPercentagePipe} from "./pipes/win-percentage.pipe";
import {SumFlawlessPipe} from "./pipes/sum-flawless.pipe";
import {StreakPipe, StreakIconPipe} from "./pipes/streak.pipe";
import {FooterComponent} from "./components/footer.component";
import {EquippedGearComponent} from "./components/equipped-gear.component";
import {ActivityChartPipe} from "./pipes/activity-chart.pipe";
import {SubclassComponent} from "./components/subclass.component";
import {ClassStatsComponent} from "./components/class-stats.component";
import {ClassStatName} from "./pipes/class-stats.pipe";

export const APP_DECLERATIONS = [
  ControlComponent,
  MapsComponent,
  NotFound404Component,
  MapsComponent,
  ReportComponent,
  WeaponUsageComponent,
  WeaponGuardianComponent,
  Emblem,
  QuickStats,
  PlayerComponent,
  ActivityChartComponent,
  WinPercentagePipe,
  SumFlawlessPipe,
  StreakPipe,
  StreakIconPipe,
  FooterComponent,
  EquippedGearComponent,
  SubclassComponent,
  ClassStatsComponent,
  ActivityChartPipe,
  ClassStatName,
  ClassStatsComponent
];
