import { Pipe, PipeTransform } from '@angular/core';
import { Match } from "../models/stats.model";

@Pipe({ name: 'activityGraph' })
export class ActivityGraphPipe implements PipeTransform {
  transform(activity: Match, kdRatio: number) {
    if (kdRatio && activity) {
      let matchKd: number = activity.kills/Math.max(1, activity.deaths);

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
