import { MenuComponent } from "./components/menu/menu.component";
import { MapsComponent } from "./components/maps/maps.component";
import { HomeComponent } from "./components/home/home.component";
import { ReportComponent } from "./components/report/report.component";
import { NotFound404Component } from "./components/notfound404/notfound404.component";
import { PlayerComponent } from "./components/player/player.component";
import { PlayerHeaderComponent } from "./components/player-header/player-header.component";
import { PlayerIntroComponent } from "./components/player-intro/player-intro.component";
import { PlayerTabEquippedComponent } from "./components/player-tabs/player-tab-equipped/player-tab-equipped.component";
import { PlayerFooterComponent } from "./components/player-footer/player-footer.component";
import { WinPercentagePipe } from "./pipes/win-percentage.pipe";
import { SumFlawlessPipe } from "./pipes/sum-flawless.pipe";
import { StreakPipe, StreakIconPipe } from "./pipes/streak.pipe";
import { ActivityGraphPipe } from "./pipes/activity-graph.pipe";
import { FilterWeapons, FilterSubclass, FilterArmor, FilterClassStats, FilterClassArmor } from "./pipes/filter-items.pipe";
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
  PlayerComponent,
  PlayerHeaderComponent,
  PlayerIntroComponent,
  PlayerTabEquippedComponent,
  PlayerFooterComponent,
  WinPercentagePipe,
  SumFlawlessPipe,
  StreakPipe,
  StreakIconPipe,
  StatsTabComponent,
  LastMatchesTabComponent,
  ActivityGraphPipe,
  FilterSubclass,
  FilterWeapons,
  FilterArmor,
  FilterClassStats,
  FilterClassArmor,
  TimeAgo
];
