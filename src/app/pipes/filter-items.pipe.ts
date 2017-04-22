import { Pipe, PipeTransform } from '@angular/core';
import { ClassStat } from "../models/player.model";

@Pipe({ name: 'filterClassStats' })
export class FilterClassStats implements PipeTransform {
  transform(stats: ClassStat[]) {
    if (!stats) return [];
    const showStats:string[] = ['STAT_INTELLECT', 'STAT_DISCIPLINE', 'STAT_STRENGTH'];
    const filtered:ClassStat[] = [];
    for (let s = 0; s < 3; s++) {
      let name:string = showStats[s];
      let stat:ClassStat = stats[name];
      let value:number = stat ? stat.value : 0;
      let normalized:number = value > 300 ? 300 : value;
      let tiers:number[] = [];
      let remaining:number = value;
      for (let t = 0; t < 5; t++) {
        remaining -= tiers[t] = remaining > 60 ? 60 : remaining;
      }
      let percentage:number = 100 * normalized / 300;
      let tier:number = Math.floor(normalized / 60);
      filtered.push({
        name: name,
        value: value,
        normalized: normalized,
        percentage: percentage,
        tier: tier,
        tiers: tiers,
        remaining: remaining,
        cooldown: 0
      });
    }
    return filtered;
  }
}

@Pipe({ name: 'filterClassArmor' })
export class FilterClassArmor implements PipeTransform {
  transform(stats: ClassStat[]) {
    if (!stats) return [];
    const showStats:string[] = ['STAT_ARMOR', 'STAT_RECOVERY', 'STAT_AGILITY'];
    const filtered:ClassStat[] = [];
    for (let s = 0; s < 3; s++) {
      let name:string = showStats[s];
      let stat:ClassStat = stats[name];
      let value:number = stat ? stat.value : 0;
      let normalized:number = value > 10 ? 10 : value;
      let percentage:number = 100 * normalized / 10;
      filtered.push({
        name: name,
        value: value,
        normalized: normalized,
        percentage: percentage
      });
    }
    return filtered;
  }
}

@Pipe({ name: 'orderBy' })
export class OrderByPipe implements PipeTransform{
  transform(arr, stats){
    if(arr === undefined){return null;}
    return arr.sort((a, b) => {
      if (stats[a] && stats[a].basic) {
        if (stats[a].basic.value < stats[b].basic.value) {
          return 1;
        }
        if (stats[a].basic.value > stats[b].basic.value) {
          return -1;
        }
      }
      return 0;
    });
  }
}
