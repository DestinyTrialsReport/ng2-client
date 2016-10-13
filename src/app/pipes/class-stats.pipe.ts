import { Pipe, PipeTransform } from '@angular/core';
import {ClassStat, Character} from "../models/player.model";

@Pipe({ name: 'classStatName' })
export class ClassStatName implements PipeTransform {
  transform(character: Character) {
    if (character && character.characterBase && character.characterBase.stats) {
      let stats:ClassStat[] = [];
      for (var key in character.characterBase.stats) {
        if (['STAT_INTELLECT', 'STAT_DISCIPLINE', 'STAT_STRENGTH'].includes(key)) {
          stats.push(character.characterBase.stats[key])
        }
      }
      return stats.map(character => console.log(character))
    }
  }
}
