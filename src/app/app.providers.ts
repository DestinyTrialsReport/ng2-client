import { MapsService } from "./services/maps.service";
import { ManifestService } from "./services/manifest.service";
import { PlayerService } from "./services/player.service";
import { APP_INITIALIZER } from "@angular/core";
import { AuthService } from "./services/auth.service";
import { LeaderboardService } from "./services/leaderboard.service";
import { PopoverConfig } from 'ng2-bootstrap/popover';
import {HammerGestureConfig, HAMMER_GESTURE_CONFIG} from "@angular/platform-browser";

export function manifestFactory(service: ManifestService) {
  return () => { return service.loadManifest(); };
}

export function getPopoverConfig(): PopoverConfig {
  return Object.assign(
    new PopoverConfig(), {
      placement: 'top',
      container: 'body',
      triggers: 'mouseenter:mouseleave'
    });
}

export class MyHammerConfig extends HammerGestureConfig {
  overrides = <any> {
    'pinch': { enable: false },
    'rotate': { enable: false }
  }
}

export const APP_PROVIDERS = [
  AuthService,
  MapsService,
  LeaderboardService,
  PlayerService,
  ManifestService,
  {
    provide: APP_INITIALIZER,
    useFactory: manifestFactory,
    deps: [ManifestService],
    multi: true
  },
  {
    provide: PopoverConfig,
    useFactory: getPopoverConfig
  },
  {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: MyHammerConfig
  }
];
