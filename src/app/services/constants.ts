export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const API_BASE_URL: string = `http://${HOST}:${PORT}`;
export const DTR_BASE_URL: string = 'https://api.destinytrialsreport.com';
export const GGG_BASE_URL: string = 'https://api.guardian.gg';
export const BUNGIE_BASE_URL: string = 'https://proxy.destinytrialsreport.com/platform/destiny';
export const BUNGIE_BASE_URLS: string[] = ['https://proxy.destinytrialsreport.com/platform/destiny', 'https://osiris.destinytrialsreport.com/platform/destiny'];

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
