import { ReactiveFormsModule } from '@angular/forms';
import {RouterModule, PreloadAllModules} from '@angular/router';

import { EffectsModule } from '@ngrx/effects';
import { RouterStoreModule } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';

import { routes } from './app.routing';
import { rootReducer } from './reducers';
import {PlayerEffects} from "./effects/player.effects";
import {MapEffects} from "./effects/map.effects";
import {TabsModule, TooltipModule, ProgressbarModule} from "ng2-bootstrap";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";


export const APP_IMPORTS = [
  EffectsModule.run(PlayerEffects),
  EffectsModule.run(MapEffects),
  TabsModule,
  TooltipModule,
  ProgressbarModule,
  ReactiveFormsModule,
  RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  RouterStoreModule.connectRouter(),
  StoreModule.provideStore(rootReducer),
  StoreDevtoolsModule.instrumentOnlyWithExtension()
];

/**
 * Currently, MdButtonModule stops HMR from working properly
 * if it is imported on initial load. If you uncomment it after initial
 * load the page will refresh and MdButton will be fine.
 * If you find a better solution, please submit a PR or file an issue.
 */
// if (!HMR) {
//   APP_IMPORTS.push(MdButtonModule);
// }
//
