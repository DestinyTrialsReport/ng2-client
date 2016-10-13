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
  weapon_type: string;
  bucket: string;
  bucketHash?: number;
  bucketName?: string;
  kills: string;
  sum_kills: string;
  file_name: string;
  // constructor(data:any) {
  //   if (data) {
  //     this.weaponType = data.weapon_type;
  //     this.imagePath = 'https://destinytrialsreport.com/assets/img/weapon-icons/' + data.file_name;
  //     this.kills = parseInt(data.kills);
  //     this.sumKills = parseInt(data.sum_kills);
  //
  //     this.bucketHash = this.itemTypeNameToBucket(this.weaponType);
  //     this.bucketName = this.bucketHashToName(this.bucketHash);
  //   }
  // }
  //
  // itemTypeNameToBucket(weaponType:string):number {
  //   let buckets = {
  //     'Auto Rifle': 1498876634,
  //     'Hand Cannon': 1498876634,
  //     'Pulse Rifle': 1498876634,
  //     'Scout Rifle': 1498876634,
  //     'Fusion Rifle': 2465295065,
  //     'Sniper Rifle': 2465295065,
  //     'Shotgun': 2465295065,
  //     'Sidearm': 2465295065,
  //     'Machine Gun': 953998645,
  //     'Rocket Launcher': 953998645,
  //     'Sword': 953998645
  //   };
  //   return buckets[weaponType];
  // }
  //
  // bucketHashToName(bucket:number):string {
  //   let buckets = {
  //     1498876634: 'primary',
  //     2465295065: 'special',
  //     953998645: 'heavy'
  //   };
  //   return buckets[bucket];
  // }

}
