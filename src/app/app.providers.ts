import {MapsService} from "./services/maps.service";
import {ManifestService} from "./services/manifest.service";
import {AppResolver} from "./app.resolver";
import {PlayerService} from "./services/player.service";
import {DOMEvents} from "./dom.events";

export const APP_PROVIDERS = [
  DOMEvents,
  AppResolver,
  MapsService,
  ManifestService,
  PlayerService
];
