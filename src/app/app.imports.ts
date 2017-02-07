import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IdlePreload, IdlePreloadModule } from '@angularclass/idle-preload';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { routes } from './app.routing';
import { reducer } from './reducers';
import { PlayerEffects } from "./effects/player.effects";
import { MapEffects } from "./effects/map.effects";
import { TypeaheadModule } from 'ng2-bootstrap/typeahead';
import { TabsModule } from "ng2-bootstrap/tabs";
import { TooltipModule } from "ng2-bootstrap/tooltip";
import { ProgressbarModule } from "ng2-bootstrap/progressbar";
import { ActivityEffects } from "./effects/activity.effects";
import { StatsEffects } from "./effects/stats.effects";
import { AuthEffects } from "./effects/auth.effects";
import { LeaderboardEffects } from "./effects/leaderboard.effects";
import { Ng2PaginationModule } from "ng2-pagination";
import { AdsenseModule } from "./ng2-adsense";

const STORE_DEV_TOOLS_IMPORTS = [];
if (ENV === 'development' && !AOT &&
  ['monitor', 'both'].includes(STORE_DEV_TOOLS) // set in constants.js file in project root
) STORE_DEV_TOOLS_IMPORTS.push(...[
  StoreDevtoolsModule.instrumentStore({
    monitor: useLogMonitor({
      visible: true,
      position: 'right'
    })
  })
]);

export const APP_IMPORTS = [
  EffectsModule.run(AuthEffects),
  EffectsModule.run(PlayerEffects),
  EffectsModule.run(ActivityEffects),
  EffectsModule.run(StatsEffects),
  EffectsModule.run(MapEffects),
  EffectsModule.run(LeaderboardEffects),
  TabsModule.forRoot(),
  TypeaheadModule.forRoot(),
  TooltipModule.forRoot(),
  ProgressbarModule.forRoot(),
  ReactiveFormsModule,
  Ng2PaginationModule,
  IdlePreloadModule.forRoot(), // forRoot ensures the providers are only created once
  RouterModule.forRoot(routes, { useHash: false, preloadingStrategy: IdlePreload }),
  AdsenseModule.forRoot({
    adClient: 'ca-pub-7408805581120581',
    adSlot: 8795722555
  }),
  StoreModule.provideStore(reducer),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevtoolsModule.instrumentOnlyWithExtension()
];
