import { Pipe, PipeTransform } from '@angular/core';
import { DTRStats } from "../models/stats.model";

@Pipe({ name: 'sumFlawless' })
export class SumFlawlessPipe implements PipeTransform {
  transform(stats: DTRStats) {
    if (stats) {
      return ['year1', 'year2', 'year3'].reduce((total, current) => {
        let data:any = stats[current];
        let flawless:number = 0;
        if (data && data.flawless) {
          flawless = data.flawless;
        }
        return total + flawless;
      }, 0);
    }
  }
}
