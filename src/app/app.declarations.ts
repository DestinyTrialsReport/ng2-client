import {NotFound404Component} from './components/notfound404/notfound404.component';
import {MapsComponent} from "./containers/maps.component";
import {WeaponUsageComponent} from "./components/weapon-usage.component";
import {WeaponGuardianComponent} from "./components/weapon-guardian.component";
import {QuickStats} from "./components/quick-stats.component";
import {PlayerComponent} from "./containers/player.component";
import {Emblem} from "./components/emblem.component";
import {ActivityChartComponent} from "./components/activities-chart.component";
import {ReportComponent} from "./containers/report.component";
import {MenuComponent} from "./components/menu/menu.component";
import {WinPercentagePipe} from "./pipes/win-percentage.pipe";
import {SumFlawlessPipe} from "./pipes/sum-flawless.pipe";
import {StreakPipe, StreakIconPipe} from "./pipes/streak.pipe";
import {FooterComponent} from "./components/footer.component";
import {EquippedGearComponent} from "./components/equipped/equipped-gear.component";
import {ActivityChartPipe} from "./pipes/activity-chart.pipe";
import {SubclassComponent} from "./components/equipped/subclass.component";
import {ClassStatsComponent} from "./components/equipped/class-stats.component";
import {
  FilterWeapons,
  FilterSubclass,
  FilterArmor,
  FilterClassStats,
  FilterClassArmor
} from "./pipes/filter-items.pipe";
import {EquippedTabComponent} from "./components/equipped/equipped-tab.component";

export const APP_DECLARATIONS = [
  MenuComponent,
  MapsComponent,
  NotFound404Component,
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
  EquippedTabComponent,
  EquippedGearComponent,
  SubclassComponent,
  ActivityChartPipe,
  FilterSubclass,
  FilterWeapons,
  FilterArmor,
  FilterClassStats,
  FilterClassArmor,
  ClassStatsComponent
];
