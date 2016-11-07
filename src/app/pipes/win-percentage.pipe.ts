import { Pipe, PipeTransform } from '@angular/core';
import { BNGStats } from "../models/stats.model";

@Pipe({ name: 'winPercentage' })
export class WinPercentagePipe implements PipeTransform {
  transform(stats: BNGStats) {
    if (stats && stats.activitiesWon && stats.activitiesEntered) {
      let perc:number = stats.activitiesWon.basic.value / stats.activitiesEntered.basic.value;
      return 100 * perc;
    }
  }
}
