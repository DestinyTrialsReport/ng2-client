import { Pipe, PipeTransform } from '@angular/core';
import { PlayerIntro } from "../models/player.model";

@Pipe({ name: 'sumFlawless' })
export class SumFlawlessPipe implements PipeTransform {
  transform(stats: PlayerIntro) {
    if (stats) {
      return ['year1', 'year2', 'year3'].reduce((total, current) => {
        let flawless:any = stats[current];
        return total + (flawless ? flawless : 0);
      }, 0);
    }
  }
}
