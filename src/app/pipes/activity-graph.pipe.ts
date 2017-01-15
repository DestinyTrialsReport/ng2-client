import { Pipe, PipeTransform } from '@angular/core';
import { Activity } from "../models/activity.model";

@Pipe({ name: 'activityGraph' })
export class ActivityGraphPipe implements PipeTransform {
  transform(activity: Activity, kdRatio: number) {
    if (kdRatio && activity && activity.values && activity.values) {
      let kills:number = activity.values.kills.basic.value;
      let deaths:number = Math.max(1, activity.values.deaths.basic.value);
      let matchKd:number = kills/deaths;

      let x:number = 0;
      let playerKd:number = kdRatio; //this.kd;
      let range:number = 1.5; // The highest deviation from the players' average that is visible
      let graphSize:number = 1.5; // Available size for the deviations, in rem
      let factor:number = graphSize / (range * 2);

      x = -Math.min(range, Math.max(-range, matchKd - playerKd));

      let translateY = 'translateY(' + (x * factor) + 'rem)';
      return {
        'transform': translateY,
        '-webkit-transform': translateY,
        '-ms-transform': translateY
      };
    }
  }
}
