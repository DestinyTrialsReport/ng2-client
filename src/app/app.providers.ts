import {MapsService} from "./services/maps.service";
import {ManifestService} from "./services/manifest.service";
import {PlayerService} from "./services/player.service";
import {APP_INITIALIZER, Injectable} from "@angular/core";
import {HAMMER_GESTURE_CONFIG, HammerGestureConfig} from "@angular/platform-browser";
import {HammerInstance} from "@angular/platform-browser/src/dom/events/hammer_gestures";


@Injectable()
export class AppGestureConfig extends HammerGestureConfig { }

// export class HammerConfig extends HammerGestureConfig  {
//
//   buildHammer(element: HTMLElement): HammerInstance {
//     var mc = new Hammer(element);
//
//     mc.get('pinch').set({ enable: true });
//     mc.get('rotate').set({ enable: true });
//     mc.get('pan').set({ enable: true });
//
//     mc.add( new Hammer.Swipe({ direction: Hammer.DIRECTION_ALL, threshold: 0 }) );
//
//     for (let eventName in this.overrides) {
//       mc.get(eventName).set(this.overrides[eventName]);
//     }
//
//     return mc;
//   }
// }

export function manifestFactory(service: ManifestService) {
  return () => { return service.loadManifest(); };
}

export const APP_PROVIDERS = [
  MapsService,
  PlayerService,
  ManifestService,
  {
    provide: APP_INITIALIZER,
    useFactory: manifestFactory,
    deps: [ManifestService],
    multi: true
  },
  {
    provide: HAMMER_GESTURE_CONFIG,
    useClass: AppGestureConfig
  }
];
