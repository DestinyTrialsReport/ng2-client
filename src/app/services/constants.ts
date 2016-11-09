export const API_KEY = ENV === 'production' ? '6b1563bd89854465ab2a423d033c7ddf' : 'ee5c2bf3759e4219a50fa9fd47d47805';
export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const DTR_BASE_URL: string = 'https://api.destinytrialsreport.com';
export const GGG_BASE_URL: string = 'https://api.guardian.gg';
export const BUNGIE_BASE_URL: string = 'https://proxy.destinytrialsreport.com/platform/destiny';
export const BUNGIE_BASE_URLS: string[] = ['https://www.bungie.net/platform/destiny', 'https://osiris.destinytrialsreport.com/platform/destiny'];

export const WEAPON_BUCKETS: any = [1498876634, 2465295065, 953998645];
export const ARMOR_BUCKETS: any = [3448274439, 14239492, 3551918588, 20886954];
export const EQUIPPED_BUCKETS: any = [...WEAPON_BUCKETS, ...ARMOR_BUCKETS, 3284755031];

export const TYPE_BUCKETS: any = {
                'Auto Rifle': 1498876634,
                'Hand Cannon': 1498876634,
                'Pulse Rifle': 1498876634,
                'Scout Rifle': 1498876634,
                'Fusion Rifle': 2465295065,
                'Sniper Rifle': 2465295065,
                'Shotgun': 2465295065,
                'Sidearm': 2465295065,
                'Machine Gun': 953998645,
                'Rocket Launcher': 953998645,
                'Sword': 953998645
              };

export const BUCKET_NAMES: any = {
                1498876634: 'primary',
                2465295065: 'special',
                953998645: 'heavy'
              };

export const HIDDEN_NODES: any = [
  0,
  889765000,  // Special Ops
  21956111,   // Orange Chroma
  73039185,   // Blue Chroma
  74523350,   // Cannibalism
  193091484,  // Increase Strength
  213547364,  // Will of Light
  217480046,  // Twist Fate
  300289986,  // Dreg Burn
  431265444,  // Mutineer
  472357138,  // Void Damage
  519240296,  // White Chroma
  617082448,  // Reforge Ready
  643689081,  // Kinetic Damage
  994456416,  // Burgeoning Hunger
  1034209669, // Increase Intellect
  1259277924, // Red Chroma
  1263323987, // Increase Discipline
  1270552711, // Infuse
  1305317488, // Aspect Swap
  1450441122, // Demotion
  1516989546, // Magenta Chroma
  1644354530, // Sword Strike
  1782221257, // Shank Burn
  1891493121, // Dark Breaker
  1920788875, // Ascend
  1975859941, // Solar Damage
  2086308543, // Upgrade Defense
  2133116599, // Deactivate Chroma
  2470010183, // Hive Disruptor
  2493487228, // Green Chroma
  2688431654, // Arc Damage
  2689436406, // Upgrade Damage
  2845051978, // Ice Breaker
  2978058659, // Oracle Disruptor
  3200611139, // Scabbard
  3575189929, // Hands-On
  3707521590, // Vandal Burn
  3742851299, // Lich Bane
  3838454323, // Yellow Chroma
  3985040583, // Disciplinarian
  4197414939  // Inverse Shadow
];


export const CRUCIBLE_MAPS: any = {
  "284635225": {
    "name": "The Burning Shrine",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_the_burning_shrine.jpg",
      "mapImage": "/assets/img/maps/the_burning_shrine.jpg"
  },
    "443057682": {
    "name": "Skyshock",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_skyshock.jpg"
  },
    "469270447": {
    "name": "Memento",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/memento.jpg"
  },
    "637046772": {
    "name": "Thieves' Den",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/thieves_den.jpg"
  },
    "1448094960": {
    "name": "The Dungeons",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/the_dungeons.jpg"
  },
    "1478347980": {
    "name": "Campus Martius",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/Campus_Martius.jpg"
  },
    "1709749894": {
    "name": "Skyline",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/skyline.jpg"
  },
    "1719392441": {
    "name": "Crossroads",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crossroads.jpg"
  },
    "1851417512": {
    "name": "The Drifter",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/the_drifter.jpg"
  },
    "2037022373": {
    "name": "Vertigo",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/vertigo.jpg"
  },
    "2082069870": {
    "name": "The Anomaly",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_the_anomaly.jpg",
      "mapImage": "/assets/img/maps/the_anomaly.jpg"
  },
    "2243240710": {
    "name": "Infinite Descent",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/Infinite_Descent.jpg"
  },
    "2332037858": {
    "name": "Widow's Court",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/widows_court.jpg",
      "mapImage": "/assets/img/maps/widows_court.jpg"
  },
    "2430076725": {
    "name": "Blind Watch",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_blind_watch.jpg",
      "mapImage": "/assets/img/maps/blind_watch.jpg"
  },
    "2507231345": {
    "name": "Frontier",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/frontier.jpg"
  },
    "2680821721": {
    "name": "The Cauldron",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_cauldron.jpg"
  },
    "3053288711": {
    "name": "Floating Gardens",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/floating_gardens.jpg"
  },
    "3101475152": {
    "name": "Firebase Delphi",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_firebase_delphi.jpg",
      "mapImage": "/assets/img/maps/firebase_delphi.jpg"
  },
    "3156370656": {
    "name": "Sector 618",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/sector_618.jpg"
  },
    "3277621970": {
    "name": "The Timekeeper",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/timekeeper.jpg",
      "mapImage": "/assets/img/maps/the_timekeeper.jpg"
  },
    "3292667877": {
    "name": "Asylum",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_asylum.jpg",
      "mapImage": "/assets/img/maps/asylum.jpg"
  },
    "3412406993": {
    "name": "Cathedral of Dusk",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/cathedral_of_dusk.jpg"
  },
    "3602734434": {
    "name": "Bannerfall",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/bannerfall.jpg",
      "mapImage": "/assets/img/maps/bannerfall.jpg"
  },
    "3817155567": {
    "name": "Twilight Gap",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_twilight_gap_2.jpg",
      "mapImage": "/assets/img/maps/twilight_gap.jpg"
  },
    "3848655103": {
    "name": "Black Shield",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/black_shield.jpg"
  },
    "3856604751": {
    "name": "First Light",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_first_light.jpg",
      "mapImage": "/assets/img/maps/first_light.jpg"
  },
    "3918359338": {
    "name": "Icarus",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/icarus.jpg"
  },
    "4105918304": {
    "name": "Last Exit",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/last_exit.jpg"
  },
    "4107311671": {
    "name": "Rusted Lands",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_the_rusted_lands.jpg",
      "mapImage": "/assets/img/maps/rusted_lands.jpg"
  },
    "4163254808": {
    "name": "Shores of Time",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_shores_of_time.jpg",
      "mapImage": "/assets/img/maps/shores_of_time.jpg"
  },
    "4200263342": {
    "name": "Bastion",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_bastion.jpg",
      "mapImage": "/assets/img/maps/bastion.jpg"
  },
    "4260139097": {
    "name": "Pantheon",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_pantheon.jpg"
  },
    "4287936726": {
    "name": "Exodus Blue",
      "pgcrImage": "/img/theme/destiny/bgs/pgcrs/crucible_exodus_blue.jpg",
      "mapImage": "/assets/img/maps/exodus_blue.jpg"
  }
};
