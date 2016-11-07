export interface MapData {
  map_info: MapInfo
  weapon_stats: WeaponUsage[]
}

export interface CurrentMap {
  referenceId: string
  start_date: string
  week: string
  activityName: string
  pgcrImage: string
}

export interface MapInfo {
  week: string;
  referenceId: string;
  matches: string;
  name: string;
  pgcrImage: string;
  mapImage: string;
  players: string;
  lighthouse: string;
  kills: string;
  weekText: string;
}

export interface WeaponUsage {
  bucket?: string;
  bucketHash?: number;
  bucketName?: string;
  kills: number;
  sum_kills: number;
  file_name: string;
  killPercentage?: number;
  diffPercentage?: number;
}

// export class GuardianWeapon {
//   hash: number;
//   name: string;
//   tier: number;
//   icon: string;
//   day: string;
//   kills: number;
//   precisionKills: number;
//   uses: number;
//
//   constructor(data:any) {
//     this.hash = data.hash;
//     this.name = data.name;
//     this.tier = data.tier;
//     this.icon = 'https://www.bungie.net' + data.icon;
//     this.day = data.day;
//     this.kills = data.kills;
//     this.precisionKills = data.precisionKills;
//     this.uses = data.uses;
//   }
// }
