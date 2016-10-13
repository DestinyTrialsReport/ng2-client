import { Pipe, PipeTransform } from '@angular/core';
import {Activity} from "../models/activity.model";

@Pipe({ name: 'activityChart' })
export class ActivityChartPipe implements PipeTransform {
  transform(activity: Activity, kdRatio: number) {
    if (kdRatio && activity && activity.values && activity.values) {
      let deaths:number = activity.values.kills.basic.value;
      deaths = deaths === 0 ? 1 : activity.values.kills.basic.value;

      let kills:number = activity.values.deaths.basic.value;
      let x:number = 0;
      let playerKd:number = kdRatio; //this.kd;
      let range:number = 1.5;
      let factor:number = -60;

      let matchKd:number = kills/deaths;

      if (matchKd < playerKd) {
        x = Math.max(-range, matchKd - playerKd);
      } else {
        x = Math.min(range, matchKd - playerKd);
      }

      let translateY = 'translateY(' + (x * factor) + '%)';
      return {
        'transform': translateY,
        '-webkit-transform': translateY,
        '-ms-transform': translateY
      };
    }
  }
}
