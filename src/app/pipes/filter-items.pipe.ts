import { Pipe, PipeTransform } from '@angular/core';
import {Item} from "../models/inventory.model";
import {WEAPON_BUCKETS, ARMOR_BUCKETS} from "../services/constants";
import {ClassStat} from "../models/player.model";

@Pipe({ name: 'filterSubclass' })
export class FilterSubclass implements PipeTransform {
  transform(items: Item[]) {
    if (!items) return [];
    return items.filter(item => item.bucketHash == 3284755031);
  }
}

@Pipe({ name: 'filterWeapons' })
export class FilterWeapons implements PipeTransform {
  transform(items: Item[]) {
    if (!items) return [];
    return items.filter(item => WEAPON_BUCKETS.indexOf(item.bucketHash) > -1);
  }
}

@Pipe({ name: 'filterArmor' })
export class FilterArmor implements PipeTransform {
  transform(items: Item[]) {
    if (!items) return [];
    const armor: Item[] = items.filter(item => ARMOR_BUCKETS.indexOf(item.bucketHash) > -1);
    const hasExotic: boolean = armor.map(item => item.tT).indexOf(6) > -1;

    return armor.filter(item => hasExotic ? item.tT === 6 : item.bucketHash === 3448274439);
  }
}

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
      for (var t = 0; t < 5; t++) {
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
