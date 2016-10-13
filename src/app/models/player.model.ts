import {Activity} from "./activity.model";
export interface Player {
  displayName: string,
  membershipId: string,
  membershipType: number,
  characterBase: {
    characterId: string,
    powerLevel: number,
    grimoireScore: number,
    stats: ClassStat[]
  },
  emblemPath: string,
  backgroundPath: string,
  characters: Character[],
  loaded: boolean,
  classStats: ClassStat[]
  activities: Activity[]
}

export interface Character {
  membershipId: string,
  membershipType: number,
  characterBase: {
    characterId: string,
    powerLevel: number,
    grimoireScore: number,
    stats: ClassStat[]
  },
  emblemPath: string,
  backgroundPath: string
}

export interface DTRStats {
  membershipId: string,
  flawless: {
    years: {
      1: Flawless,
      2: Flawless,
      3: Flawless
    }
  }
}

export interface Flawless {
  count: number
}

export interface GGGStats {
  elo: number,
  rank: number
}

export interface BNGStats {
  activitiesWon: ActivityValue,
  activitiesEntered: ActivityValue,
  killsDeathsRatio: ActivityValue
}

export interface ActivityValue {
  statId: string,
  basic: {
    value: number,
    displayValue: string
  }
}

export interface ClassStat {
  name: string;
  value: number;
  normalized: number;
  tier: number;
  tiers: number[];
  cooldown: number;
  percentage: number;
  remaining: number;
}

  // constructor(stat: any, name: string, hasTier:boolean) {
  //   this.name = this.titleize(name);
  //   this.value = stat.value || 0;
  //
  //   if (hasTier) {
  //     this.normalized = stat.value > 300 ? 300 : stat.value;
  //     this.percentage = 100 * this.normalized / 300;
  //     this.tier = Math.floor(this.normalized / 60);
  //     let tiers:any = [];
  //     let remaining = this.value;
  //     for (var t = 0; t < 5; t++) {
  //       remaining -= tiers[t] = remaining > 60 ? 60 : remaining;
  //     }
  //     this.remaining = remaining;
  //     this.tiers = tiers;
  //   } else {
  //     this.percentage = 100 * this.value / 10;
  //   }
  // }

  // titleize(key:any){
  //   let titles = {
  //     "STAT_INTELLECT": "Intellect",
  //     "STAT_DISCIPLINE": "Discipline",
  //     "STAT_STRENGTH": "Strength",
  //     "STAT_ARMOR": "Armor",
  //     "STAT_AGILITY": "Agility",
  //     "STAT_RECOVERY": "Recovery"
  //   };
  //   return titles[key];
  // }

  // statHash.cooldown = getAbilityCooldown(player.characterInfo.subclassName, stats[s], statHash.tier);
