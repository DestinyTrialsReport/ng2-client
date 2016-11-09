import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { useLogMonitor } from '@ngrx/store-log-monitor';

import { routes } from './app.routing';
import { rootReducer } from './reducers';
import { PlayerEffects } from "./effects/player.effects";
import { MapEffects } from "./effects/map.effects";
import { TabsModule } from "ng2-bootstrap/components/tabs";
import { TooltipModule } from "ng2-bootstrap/components/tooltip";
import { ProgressbarModule } from "ng2-bootstrap/components/progressbar";
import { ActivityEffects } from "./effects/activity.effects";
import { StatsEffects } from "./effects/stats.effects";

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
  EffectsModule.run(PlayerEffects),
  EffectsModule.run(ActivityEffects),
  EffectsModule.run(StatsEffects),
  EffectsModule.run(MapEffects),
  TabsModule,
  TooltipModule,
  ProgressbarModule,
  ReactiveFormsModule,
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  StoreModule.provideStore(rootReducer),
  STORE_DEV_TOOLS_IMPORTS,
  StoreDevtoolsModule.instrumentOnlyWithExtension()
];
