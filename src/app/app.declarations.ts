import { MenuComponent } from "./components/menu/menu.component";
import { MapsComponent } from "./components/maps/maps.component";
import { HomeComponent } from "./components/home/home.component";
import { ReportComponent } from "./components/report/report.component";
import { NotFound404Component } from "./components/notfound404/notfound404.component";
import { QuickStats } from "./components/quick-stats.component";
import { PlayerComponent } from "./components/player/player.component";
import { Emblem } from "./components/emblem.component";
import { ActivityChartComponent } from "./components/activities-chart.component";
import { WinPercentagePipe } from "./pipes/win-percentage.pipe";
import { SumFlawlessPipe } from "./pipes/sum-flawless.pipe";
import { StreakPipe, StreakIconPipe } from "./pipes/streak.pipe";
import { FooterComponent } from "./components/footer.component";
import { EquippedGearComponent } from "./components/equipped/equipped-gear.component";
import { ActivityChartPipe } from "./pipes/activity-chart.pipe";
import { SubclassComponent } from "./components/equipped/subclass.component";
import { ClassStatsComponent } from "./components/equipped/class-stats.component";
import { FilterWeapons, FilterSubclass, FilterArmor, FilterClassStats, FilterClassArmor } from "./pipes/filter-items.pipe";
import { EquippedTabComponent } from "./components/equipped/equipped-tab.component";
import { LastMatchesTabComponent } from "./components/last-matches/last-matches-tab.component";
import { TimeAgo } from "./pipes/time-ago.pipe";
import { StatsTabComponent } from "./components/stats-tab/stats-tab.component";
import { MyReportComponent } from "./components/my-report/my-report.component";

export const APP_DECLARATIONS = [
  MenuComponent,
  MapsComponent,
  HomeComponent,
  NotFound404Component,
  ReportComponent,
  MyReportComponent,
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
  StatsTabComponent,
  EquippedGearComponent,
  LastMatchesTabComponent,
  SubclassComponent,
  ActivityChartPipe,
  FilterSubclass,
  FilterWeapons,
  FilterArmor,
  FilterClassStats,
  FilterClassArmor,
  TimeAgo,
  ClassStatsComponent
];
