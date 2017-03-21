export interface MapData {
  map_info: MapInfo
  weapon_stats: WeaponUsage[]
  map_ref: MapRef[]
}

export interface MapRef {
  referenceId: string
  week: string
}

export interface CurrentMap {
  referenceId: string
  start_date: string
  week: string
  activityName: string
  pgcrImage: string
  leaderboards: LeaderboardMeta[]
}

export interface LeaderboardMeta {
  leaderboard: string
  updated_at: string
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
  year?: string;
  isYearOne?: string;
  weekInYear?: number;
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
