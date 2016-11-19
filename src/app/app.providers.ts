import { MapsService } from "./services/maps.service";
import { ManifestService } from "./services/manifest.service";
import { PlayerService } from "./services/player.service";
import { APP_INITIALIZER } from "@angular/core";
import { AuthService } from "./services/auth.service";

export function manifestFactory(service: ManifestService) {
  return () => { return service.loadManifest(); };
}

export const APP_PROVIDERS = [
  AuthService,
  MapsService,
  PlayerService,
  ManifestService,
  {
    provide: APP_INITIALIZER,
    useFactory: manifestFactory,
    deps: [ManifestService],
    multi: true
  }
];
