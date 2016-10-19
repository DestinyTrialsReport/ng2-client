import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { routes } from './app.routing';
import { rootReducer } from './reducers';
import { PlayerEffects } from "./effects/player.effects";
import { MapEffects } from "./effects/map.effects";
import { TabsModule } from "ng2-bootstrap/components/tabs";
import { TooltipModule } from "ng2-bootstrap/components/tooltip";
import { ProgressbarModule } from "ng2-bootstrap/components/progressbar";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";


export const APP_IMPORTS = [
  EffectsModule.run(PlayerEffects),
  EffectsModule.run(MapEffects),
  TabsModule,
  TooltipModule,
  ProgressbarModule,
  ReactiveFormsModule,
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  StoreModule.provideStore(rootReducer),
  StoreDevtoolsModule.instrumentOnlyWithExtension()
];
