import { Pipe, PipeTransform } from '@angular/core';
import { DTRStats } from "../models/stats.model";

@Pipe({ name: 'sumFlawless' })
export class SumFlawlessPipe implements PipeTransform {
  transform(stats: DTRStats) {
    if (stats && stats.flawless && stats.flawless.years) {
      let total:number = 0;
      let years: any[] = Object.keys(stats.flawless.years);
      years.forEach((year: any) => {
        let data:any = stats.flawless.years[year];
        total += data.count;
      });
      return total;
    }
  }
}
