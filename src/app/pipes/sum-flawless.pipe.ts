import { Pipe, PipeTransform } from '@angular/core';
import { DTRStats } from "../models/stats.model";

@Pipe({ name: 'sumFlawless' })
export class SumFlawlessPipe implements PipeTransform {
  transform(stats: DTRStats) {
    if (stats) {
      let total:number = 0;
      let years: any[] = [1,2,3];
      years.forEach((year: any) => {
        let data:any = stats[`year${year}`];
        if (data) {
          total += data.flawless;
        }
      });
      return total;
    }
  }
}
