import { MenuComponent } from "./components/menu/menu.component";
import { MapsComponent } from "./components/maps/maps.component";
import { NotFound404Component } from "./components/notfound404/notfound404.component";
import { TimeAgo } from "./pipes/time-ago.pipe";
import { LeaderboardsComponent } from "./components/leaderboards/leaderboards.component";
import { LeaderboardTableComponent } from "./components/leaderboards/leaderboard-table/leaderboard-table.component";
import { LeaderboardHeaderComponent } from "./components/leaderboards/leaderboard-header/leaderboard-header.component";
import {LeaderboardRank} from "./pipes/leaderboard-rank.pipe";

export const APP_DECLARATIONS = [
  MenuComponent,
  MapsComponent,
  LeaderboardsComponent,
  LeaderboardHeaderComponent,
  LeaderboardTableComponent,
  NotFound404Component,
  LeaderboardRank,
  TimeAgo
];
