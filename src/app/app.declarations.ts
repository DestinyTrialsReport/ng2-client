import {
  FilterWeapons, FilterSubclass, FilterArmor, FilterArtifact, FilterClassStats, FilterClassArmor,
  OrderByPipe
} from "./pipes/filter-items.pipe";
import { MenuComponent } from "./components/menu/menu.component";
import { MapsComponent } from "./components/maps/maps.component";
import { HomeComponent } from "./components/home/home.component";
import { ReportComponent } from "./components/report/report.component";
import { NotFound404Component } from "./components/notfound404/notfound404.component";
import { ErrorComponent } from "./components/error/error.component";
import { PlayerComponent } from "./components/player/player.component";
import { PlayerHeaderComponent } from "./components/player-header/player-header.component";
import { PlayerIntroComponent } from "./components/player-intro/player-intro.component";
import { PlayerTabSummarized } from "./components/player-tabs/player-tab-summarized/player-tab-summarized.component";
import { PlayerTabEquippedComponent } from "./components/player-tabs/player-tab-equipped/player-tab-equipped.component";
import { PlayerTabRecentMatchesComponent } from "./components/player-tabs/player-tab-recent-matches/player-tab-recent-matches.component";
import { PlayerTabStatsComponent } from "./components/player-tabs/player-tab-stats/player-tab-stats.component";
import { PlayerFooterComponent } from "./components/player-footer/player-footer.component";
import { WinPercentagePipe } from "./pipes/win-percentage.pipe";
import { SumFlawlessPipe } from "./pipes/sum-flawless.pipe";
import { StreakPipe, StreakIconPipe } from "./pipes/streak.pipe";
import { ActivityGraphPipe } from "./pipes/activity-graph.pipe";
import { TimeAgo } from "./pipes/time-ago.pipe";
import { MyReportComponent } from "./components/my-report/my-report.component";
import { LeaderboardsComponent } from "./components/leaderboards/leaderboards.component";
import { LeaderboardTableComponent } from "./components/leaderboards/leaderboard-table/leaderboard-table.component";
import { LeaderboardHeaderComponent } from "./components/leaderboards/leaderboard-header/leaderboard-header.component";
import { LeaderboardRank } from "./pipes/leaderboard-rank.pipe";
import { SettingsModalComponent } from "./components/settings-modal/settings-modal.component";

export const APP_DECLARATIONS = [
  MenuComponent,
  SettingsModalComponent,
  MapsComponent,
  HomeComponent,
  LeaderboardsComponent,
  LeaderboardHeaderComponent,
  LeaderboardTableComponent,
  ErrorComponent,
  NotFound404Component,
  ReportComponent,
  MyReportComponent,
  PlayerComponent,
  PlayerHeaderComponent,
  PlayerIntroComponent,
  PlayerTabSummarized,
  PlayerTabEquippedComponent,
  PlayerTabRecentMatchesComponent,
  PlayerTabStatsComponent,
  PlayerFooterComponent,
  LeaderboardRank,
  WinPercentagePipe,
  SumFlawlessPipe,
  StreakPipe,
  StreakIconPipe,
  ActivityGraphPipe,
  FilterSubclass,
  FilterWeapons,
  FilterArmor,
  FilterArtifact,
  FilterClassStats,
  FilterClassArmor,
  OrderByPipe,
  TimeAgo
];
