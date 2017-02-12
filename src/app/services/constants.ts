export const API_KEY = ENV === 'production' ? '6b1563bd89854465ab2a423d033c7ddf' : 'ee5c2bf3759e4219a50fa9fd47d47805';
// e4ac9ad9884b412cb452ee3ffec34ecb <- leadeboards key
export const MOBILE = (typeof window !== 'undefined') ? (window.screen.availWidth < 800) : true;
export const DTR_BASE_URL: string = 'https://api.destinytrialsreport.com';
export const GGG_BASE_URL: string = 'https://api.guardian.gg';
export const BUNGIE_BASE_URL: string = 'https://www.bungie.net/Platform';


export const BUCKET_PRIMARY_WEAPON: any = 1498876634;
export const BUCKET_SPECIAL_WEAPON: any = 2465295065;
export const BUCKET_HEAVY_WEAPON: any = 953998645;

export const WEAPON_BUCKETS: any = [BUCKET_PRIMARY_WEAPON, BUCKET_SPECIAL_WEAPON, BUCKET_HEAVY_WEAPON];
export const ARMOR_BUCKETS: any = [3448274439, 14239492, 3551918588, 20886954];
export const ARTIFACT_BUCKET: any = 434908299;
export const EQUIPPED_BUCKETS: any = [...WEAPON_BUCKETS, ...ARMOR_BUCKETS, 3284755031];

export const WEAPON_TYPES: Array<string | number> = [ "Auto Rifle",
                                        "Scout Rifle",
                                        "Pulse Rifle",
                                        "Hand Cannon",
                                        "Sniper Rifle",
                                        "Fusion Rifle",
                                        "Shotgun",
                                        "Sidearm" ];

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
                'Sword': 953998645,
              };

export const BUCKET_NAMES: any = {
                1498876634: 'primary',
                2465295065: 'special',
                953998645: 'heavy'
              };

export const YEAR_ONE_DUPLICATES: string[] = [
  '2657648895',
  '2726256225',
  '2911036427',
  '135862170',
  '3926983632',
  '1055280513',
  '3222439399',
  '2563304568',
  '2167109420',
  '1375158428',
  '1557422751',
  '3141342998',
  '2180040613',
  '4251892203',
  '2217778941',
  '160095218',
  '2278129280',
  '3800763760',
  '119482464',
  '2656589561',
  '3625835502',
  '1146059646',
  '2599394508',
  '3478790848',
  '3118679308',
  '2210820430',
  '2846692979',
  '2853794413',
  '806143008',
  '3384077431',
  '335341128',
  '2344494719',
  '727840013',
  '2615561155',
  '3490486525',
  '119482466',
  '2609120348',
  '2681212685',
  '1054959830',
  '3118679309',
  '67230518',
  '1221909933',
  '2352707666',
  '3906535130',
  '2563222798',
  '2834348866',
  '2612834019',
  '3947396344',
  '135862171',
  '3259091099',
  '2775854838',
  '3968437225',
  '3478790850',
  '3191797830',
  '119482465',
  '106426948',
  '2344494718',
  '4046873053',
  '2530134059',
  '649076661',
  '2937600841',
  '3551403306',
  '88964023',
  '1094262007',
  '2670848871',
  '4086430879',
  '879791779',
  '3104387070',
  '2835361676',
  '3028978726',
  '561587767',
  '2472321204',
  '2210820429',
  '3195303140',
  '3096129877',
  '3164616404',
  '3191797831',
  '2266591883',
  '73994448',
  '4075571038',
  '3463607706',
  '3298170796',
  '260216313',
  '3982555097',
  '2176787615',
  '4026257891',
  '935317314',
  '422175840'
];

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


export const WEAPON_TYPE_REF: Array<{id: string, statId?: string, text: string}> = [
  {id: "All", text: "All"},
  {id: "Auto Rifle", text: "Auto Rifles"},
  {id: "Scout Rifle", text: "Scout Rifles"},
  {id: "Pulse Rifle", text: "Pulse Rifles"},
  {id: "Hand Cannon", text: "Hand Cannons"},
  {id: "Sniper Rifle", text: "Sniper Rifles"},
  {id: "Fusion Rifle", text: "Fusion Rifles"},
  {id: "Shotgun", text: "Shotguns"},
  {id: "Sidearm", text: "Sidearms"}
];

export const MEDALS_REF: Array<{id: number, statId: string, text: string}> = [
    {
      "id" : 38,
      "statId" : "medalsAbilityArcLightningKillMulti",
      "text" : "Storm Bringer"
    },
    {
      "id" : 31,
      "statId" : "medalsAbilityGhostGunKillMulti",
      "text" : "Way of the Gun"
    },
    {
      "id" : 33,
      "statId" : "medalsAbilityHavocKillMulti",
      "text" : "Cry Havoc"
    },
    {
      "id" : 32,
      "statId" : "medalsAbilityNovaBombKillMulti",
      "text" : "Space Magic"
    },
    {
      "id" : 37,
      "statId" : "medalsAbilityThermalHammerKillMulti",
      "text" : "Hammer and Tongs"
    },
    {
      "id" : 36,
      "statId" : "medalsAbilityVoidBowKillMulti",
      "text" : "Wild Hunt"
    },
    {
      "id" : 35,
      "statId" : "medalsActivityCompleteCycle",
      "text" : "The Cycle"
    },
    // {
    //   "id" : 34,
    //   "statId" : "medalsActivityCompleteLonewolf",
    //   "text" : "Lone Wolf"
    // },
    {
      "id" : 13,
      "statId" : "medalsAvenger",
      "text" : "Avenger"
    },
    {
      "id" : 14,
      "statId" : "medalsCloseCallTalent",
      "text" : "Narrow Escape"
    },
    {
      "id" : 15,
      "statId" : "medalsComebackKill",
      "text" : "Back in Action"
    },
    {
      "id" : 21,
      "statId" : "medalsEliminationWipeQuick",
      "text" : "Ace"
    },
    {
      "id" : 22,
      "statId" : "medalsEliminationWipeSolo",
      "text" : "Wrecking Ball"
    },
    {
      "id" : 1,
      "statId" : "medalsFirstBlood",
      "text" : "First Blood"
    },
    {
      "id" : 2,
      "statId" : "medalsGrenadeKillStick",
      "text" : "Get it Off!"
    },
    {
      "id" : 3,
      "statId" : "medalsHazardKill",
      "text" : "Hazard Pay"
    },
    {
      "id" : 4,
      "statId" : "medalsHunterKillInvisible",
      "text" : "I See You"
    },
    {
      "id" : 23,
      "statId" : "medalsKillHeadshot",
      "text" : "Bullseye"
    },
    {
      "id" : 24,
      "statId" : "medalsKillMulti2",
      "text" : "Double Down"
    },
    {
      "id" : 25,
      "statId" : "medalsKillMulti3",
      "text" : "Triple Down"
    },
    {
      "id" : 26,
      "statId" : "medalsKillMulti4",
      "text" : "Breaker"
    },
    // {
    //   "id" : 27,
    //   "statId" : "medalsKillMulti5",
    //   "text" : "Slayer"
    // },
    {
      "id" : 20,
      "statId" : "medalsKillPostmortem",
      "text" : "Postmortem"
    },
    {
      "id" : 28,
      "statId" : "medalsKillSpreeNoDamage",
      "text" : "Phantom"
    },
    {
      "id" : 8,
      "statId" : "medalsMeleeKillHunterThrowingKnifeHeadshot",
      "text" : "Stick Around"
    },
    {
      "id" : 10,
      "statId" : "medalsPaybackKill",
      "text" : "Payback"
    },
    {
      "id" : 11,
      "statId" : "medalsRadianceShutdown",
      "text" : "...And Stay Down!"
    },
    {
      "id" : 12,
      "statId" : "medalsRescue",
      "text" : "Overwatch"
    },
    {
      "id" : 29,
      "statId" : "medalsTeamKillSpree",
      "text" : "Strength of the Wolf"
    },
    {
      "id" : 19,
      "statId" : "orbsDropped",
      "text" : "Orbs Dropped"
    },
    {
      "id" : 18,
      "statId" : "resurrectionsPerformed",
      "text" : "Resurrections"
    },
    // {
    //   "id" : 30,
    //   "statId" : "score",
    //   "text" : "Score"
    // },
    // {
    //   "id" : 16,
    //   "statId" : "secondsPlayed",
    //   "text" : "Time Played"
    // },
    {
      "id" : 17,
      "statId" : "suicides",
      "text" : "Suicides"
    },
    {
      "id" : 5,
      "statId" : "weaponKillsGrenade",
      "text" : "Grenade"
    },
    {
      "id" : 6,
      "statId" : "weaponKillsMelee",
      "text" : "Melee"
    },
    {
      "id" : 7,
      "statId" : "weaponKillsSuper",
      "text" : "Super"
    },
    {
      "id" : 9,
      "statId" : "zonesCaptured",
      "text" : "Zones Captured"
    }];

export const MEDAL_DEFINITIONS: any = {
  "medalsAbilityGhostGunKillMulti": {
    "statName": "Way of the Gun",
    "statDescription": "Kill 3 enemies with a single Golden Gun charge.",
    "iconImage": "/common/destiny_content/icons/icon_m127ecce38e366af72054570a6fdbecd9.png"
  },
  "medalsAbilityHavocKillMulti": {
    "statName": "Cry Havoc",
    "statDescription": "Kill 3 enemies with a single Fist of Havoc.",
    "iconImage": "/common/destiny_content/icons/icon_m3ec59d88f90dc142b29208f5079ebe60.png"
  },
  "medalsAbilityNovaBombKillMulti": {
    "statName": "Space Magic",
    "statDescription": "Kill 3 enemies with a single Nova Bomb.",
    "iconImage": "/common/destiny_content/icons/icon_m24e361d76b433ef6c55848a54256d50c.png"
  },
  "medalsAbilityShadowStrikeKillMulti": {
    "statName": "Gutted",
    "statDescription": "Kill 3 enemies in a single Arc Blade charge.",
    "iconImage": "/common/destiny_content/icons/icon_m5ef54943e06cb079510494981d7908a2.png"
  },
  "medalsAbilityWardDeflect": {
    "statName": "Blast Shield",
    "statDescription": "Block fatal damage within 2 seconds of casting Ward of Dawn.",
    "iconImage": "/common/destiny_content/icons/icon_m8fee8c2bd6fed4a5154fea2fedf9035d.png"
  },
  "medalsActivityCompleteControlMostCaptures": {
    "statName": "Objectively Correct",
    "statDescription": "In a Control match, capture the most zones.",
    "iconImage": "/common/destiny_content/icons/icon_m8e5824ad369404c2562e408a414cd8d4.png"
  },
  "medalsActivityCompleteDeathless": {
    "statName": "Mark of the Unbroken",
    "statDescription": "Complete a match with a minimum of 15 kills without dying or being downed.",
    "iconImage": "/common/destiny_content/icons/icon_mb092f95c5860abf29bcb6548b9e44056.png"
  },
  "medalsActivityCompleteHighestScoreLosing": {
    "statName": "On The Bright Side...",
    "statDescription": "Achieve the highest score in a match despite your team's loss.",
    "iconImage": "/common/destiny_content/icons/icon_m6fcd36765e6c7b5b4278dd4996ab7629.png"
  },
  "medalsActivityCompleteHighestScoreWinning": {
    "statName": "The Best…Around",
    "statDescription": "Achieve the highest score in a match while leading your team to victory.",
    "iconImage": "/common/destiny_content/icons/icon_m1ac4982244fdb59cfd334e731503aced.png"
  },
  "medalsActivityCompleteLonewolf": {
    "statName": "Lone Wolf",
    "statDescription": "In a team game, finish first on your team with no assists.",
    "iconImage": "/common/destiny_content/icons/icon_m4d51c2cb6c2159034432dc7cee6d914c.png"
  },
  "medalsActivityCompleteSalvageMostCancels": {
    "statName": "Saboteur",
    "statDescription": "In a Salvage match, neutralize the most probes.",
    "iconImage": "/common/destiny_content/icons/icon_mbe326a50424ee5aee06450127aa1a0e6.png"
  },
  "medalsActivityCompleteSalvageShutout": {
    "statName": "Shutout",
    "statDescription": "As a team, stop your opponents from salvaging any Relics.",
    "iconImage": "/common/destiny_content/icons/icon_m96f384f962754a1a4120b4b81429ed23.png"
  },
  "medalsActivityCompleteVictory": {
    "statName": "Victory",
    "statDescription": "Win a match.",
    "iconImage": "/common/destiny_content/icons/icon_m60c77b0b755b2959e3004e72fdfc764b.png"
  },
  "medalsActivityCompleteVictoryBlowout": {
    "statName": "Decisive Victory",
    "statDescription": "In a match that reaches the score limit, double the opposing team's score.",
    "iconImage": "/common/destiny_content/icons/icon_mcb93d453dae2cc6c6e920f1988086817.png"
  },
  "medalsActivityCompleteVictoryExtraLastSecond": {
    "statName": "Clutch",
    "statDescription": "Win a match after trailing with 2 seconds remaining.",
    "iconImage": "/common/destiny_content/icons/icon_mba267dba797e3f56541e157e7733668c.png"
  },
  "medalsActivityCompleteVictoryLastSecond": {
    "statName": "Comeback",
    "statDescription": "Win a match after trailing by 500 with 30 seconds remaining OR when the enemy was nearing victory.",
    "iconImage": "/common/destiny_content/icons/icon_m12da5c4739b4add3caec0e00e92ab5b3.png"
  },
  "medalsActivityCompleteVictoryRumble": {
    "statName": "Alone at the Top",
    "statDescription": "Win a Rumble match.",
    "iconImage": "/common/destiny_content/icons/icon_ma618cd8fa6a6127fced04a5ec55765a2.png"
  },
  "medalsActivityCompleteVictoryRumbleBlowout": {
    "statName": "Sum of All Tears",
    "statDescription": "Win a Rumble match with a score greater than the sum of your enemies.",
    "iconImage": "/common/destiny_content/icons/icon_mdb6b21059de311d2fb29edf659b3435d.png"
  },
  "medalsActivityCompleteVictoryRumbleLastSecond": {
    "statName": "Won't Be Beat",
    "statDescription": "Win a Rumble match after trailing by 500 with 30 seconds remaining OR when an opponent was near the score limit.",
    "iconImage": "/common/destiny_content/icons/icon_mad16e092069664538c7a25ba955f3171.png"
  },
  "medalsActivityCompleteVictoryRumbleSuddenDeath": {
    "statName": "Heartbreaker",
    "statDescription": "Win a Rumble match in Overtime.",
    "iconImage": "/common/destiny_content/icons/icon_m04b7c6a751e5b944b769f7a236339efb.png"
  },
  "medalsActivityCompleteVictorySuddenDeath": {
    "statName": "Zero Hour",
    "statDescription": "Win a match in Overtime.",
    "iconImage": "/common/destiny_content/icons/icon_mf1d8a2e3fa2628958f313ad0c6efd115.png"
  },
  "medalsBuddyResurrectionMulti": {
    "statName": "Medic!",
    "statDescription": "Quickly revive 2 downed allies.",
    "iconImage": "/common/destiny_content/icons/icon_m80feb7e68d551509fdcde39af56c2af9.png"
  },
  "medalsBuddyResurrectionSpree": {
    "statName": "Angel of Light",
    "statDescription": "In a single life, revive 5 downed allies.",
    "iconImage": "/common/destiny_content/icons/icon_me64c76c9579f691ea1b8868de09d98ae.png"
  },
  "medalsCloseCallTalent": {
    "statName": "Narrow Escape",
    "statDescription": "Kill an enemy who nearly killed you.",
    "iconImage": "/common/destiny_content/icons/icon_m915391b17f5c469999f22d68a79d9beb.png"
  },
  "medalsComebackKill": {
    "statName": "Back in Action",
    "statDescription": "Kill an enemy after 5 consecutive lives with no kills.",
    "iconImage": "/common/destiny_content/icons/icon_mba301f76541953a63a1c53720ab05c33.png"
  },
  "medalsDominationKill": {
    "statName": "Domination",
    "statDescription": "Kill an enemy while your team holds all 3 Control zones.",
    "iconImage": "/common/destiny_content/icons/icon_ma99ed31f1ed16011d8e212260fa6a078.png"
  },
  "medalsDominionZoneCapturedSpree": {
    "statName": "Hat Trick",
    "statDescription": "In a single life, capture 3 Control zones.",
    "iconImage": "/common/destiny_content/icons/icon_mfd3fb6025a8703cefaf9afcb996a8f48.png"
  },
  "medalsDominionZoneDefenseKillSpree": {
    "statName": "Defender",
    "statDescription": "In a single life, score 5 Zone Defense kills.",
    "iconImage": "/common/destiny_content/icons/icon_m955725c8ef6419b860cad57b4c8f9b38.png"
  },
  "medalsDominionZoneOffenseKillSpree": {
    "statName": "At Any Cost",
    "statDescription": "In a single life, kill 3 enemies while capturing a Control zone.",
    "iconImage": "/common/destiny_content/icons/icon_ma9bf61a3706747ed8c4596d7ae537943.png"
  },
  "medalsFirstBlood": {
    "statName": "First Blood",
    "statDescription": "Score the first kill in a match.",
    "iconImage": "/common/destiny_content/icons/icon_mbacd26f29970ada09f819d6e308285cb.png"
  },
  "medalsFirstPlaceKillSpree": {
    "statName": "Uprising",
    "statDescription": "In a single match, kill the leader 3 times.",
    "iconImage": "/common/destiny_content/icons/icon_mf7552b8b42fe0cdce6baddafff91b2e4.png"
  },
  "medalsGrenadeKillStick": {
    "statName": "Get it Off!",
    "statDescription": "Kill an enemy by sticking them with a grenade.",
    "iconImage": "/common/destiny_content/icons/icon_m521ab81bf41b7dfcbebad5626bb56fb8.png"
  },
  "medalsHazardKill": {
    "statName": "Hazard Pay",
    "statDescription": "Kill an enemy with an exploding object.",
    "iconImage": "/common/destiny_content/icons/icon_m13a859c5047ecb0fc5388156398ed4be.png"
  },
  "medalsHunterKillInvisible": {
    "statName": "I See You",
    "statDescription": "Kill an invisible enemy.",
    "iconImage": "/common/destiny_content/icons/icon_m0b4e7db175edc2b7b0bfd95b6cfd3f08.png"
  },
  "medalsKillAssistSpree": {
    "statName": "Unsung Hero",
    "statDescription": "In a single life, assist your allies on 3 kills.",
    "iconImage": "/common/destiny_content/icons/icon_m8dbf600866a4d744af7159f425e4178d.png"
  },
  "medalsKillAssistSpreeFfa": {
    "statName": "Enemy of My Enemy",
    "statDescription": "In a single life, catch 3 enemies in crossfire.",
    "iconImage": "/common/destiny_content/icons/icon_maf9b17453a2f6b457516e8027426faca.png"
  },
  "medalsKillHeadshot": {
    "statName": "Bullseye",
    "statDescription": "In a single life, kill 3 enemies with headshots.",
    "iconImage": "/common/destiny_content/icons/icon_m0f3d34a0e6cf3aa527172d899a7a97d2.png"
  },
  "medalsKilljoy": {
    "statName": "Enforcer",
    "statDescription": "Shut down an enemy's kill streak.",
    "iconImage": "/common/destiny_content/icons/icon_m297f0d590aff33be59871d6c4a4673e1.png"
  },
  "medalsKilljoyMega": {
    "statName": "End of the Line",
    "statDescription": "Stop an enemy on a 15+ kill streak.",
    "iconImage": "/common/destiny_content/icons/icon_mae5e8eebd9f38f37572694b26e970e66.png"
  },
  "medalsKillMulti2": {
    "statName": "Double Down",
    "statDescription": "Rapidly kill 2 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_m746baced6bbe4a4c6e7d98aa6345617d.png"
  },
  "medalsKillMulti3": {
    "statName": "Triple Down",
    "statDescription": "Rapidly kill 3 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_m1f584310fb18bb5c0fa21e81e295fee5.png"
  },
  "medalsKillMulti4": {
    "statName": "Breaker",
    "statDescription": "Rapidly kill 4 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_m224c303fc865ede206b5830bd8ac2207.png"
  },
  "medalsKillMulti5": {
    "statName": "Slayer",
    "statDescription": "Rapidly kill 5 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_m4cf12012358cd4058062648baf40ae58.png"
  },
  "medalsKillMulti6": {
    "statName": "Reaper",
    "statDescription": "Rapidly kill 6 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_m6bf01b4e21668eab9d72f6d8faaee823.png"
  },
  "medalsKillMulti7": {
    "statName": "Seventh Column",
    "statDescription": "Defy probability by rapidly killing 7 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_m453097fa911a14c180e8d4f88bfdcf76.png"
  },
  "medalsKillPostmortem": {
    "statName": "Postmortem",
    "statDescription": "Kill one or more enemies after you have died.",
    "iconImage": "/common/destiny_content/icons/icon_mdae6855231eb8bf695d6a97a519c9d43.png"
  },
  "medalsKillSpree1": {
    "statName": "Merciless",
    "statDescription": "In a single life, kill 5 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_me7019dac10f7230fb824c1dc389257a0.png"
  },
  "medalsKillSpree2": {
    "statName": "Relentless",
    "statDescription": "In a single life, kill 10 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_mb313be68b3fcf783cacb5a529e3e0f22.png"
  },
  "medalsKillSpree3": {
    "statName": "Reign of Terror",
    "statDescription": "In a single life, kill 15 enemies.",
    "iconImage": "/common/destiny_content/icons/icon_mc364a999ecb72c893f783e7b5b652f05.png"
  },
  "medalsMeleeKillHunterThrowingKnifeHeadshot": {
    "statName": "Stick Around",
    "statDescription": "Fatally headshot an enemy with a Throwing Knife.",
    "iconImage": "/common/destiny_content/icons/icon_mda8430b7c74ea0485026a9f156ffc11f.png"
  },
  "medalsRescue": {
    "statName": "Overwatch",
    "statDescription": "Defend an ally from enemy fire.",
    "iconImage": "/common/destiny_content/icons/icon_mfc8d74051a3ed141a66cbcc99d711158.png"
  },
  "medalsSalvageProbeCanceled": {
    "statName": "Disruption",
    "statDescription": "In Salvage, neutralize the enemy probe.",
    "iconImage": "/common/destiny_content/icons/icon_mf90155e3e5a87f393d143dc979bcfa62.png"
  },
  "medalsSalvageProbeCompleteSpree": {
    "statName": "Salvage Crew",
    "statDescription": "As a team, salvage 3 relics in a match.",
    "iconImage": "/common/destiny_content/icons/icon_mdc0055b80bd1adf62184360b3b43f524.png"
  },
  "medalsSalvageProbeDefenseKill": {
    "statName": "Im-probe-able",
    "statDescription": "Kill an enemy near the allied probe.",
    "iconImage": "/common/destiny_content/icons/icon_m8886beac6bc2a3761391f0f9ab5da602.png"
  },
  "medalsSalvageZoneCapturedSpree": {
    "statName": "Relic Hunter",
    "statDescription": "Help capture 3 Relic zones in a Salvage match.",
    "iconImage": "/common/destiny_content/icons/icon_m8cc592ab584e146ed05ab24f92beace5.png"
  },
  "medalsTeamDominationHold1m": {
    "statName": "Lockdown",
    "statDescription": "As a team, hold all 3 Control zones for 60 seconds.",
    "iconImage": "/common/destiny_content/icons/icon_m25c806bb571d215e8ae2e43285f74186.png"
  },
  "medalsTeamKillSpree": {
    "statName": "Strength of the Wolf",
    "statDescription": "As a team, kill 10 enemies with no one on your team dying.",
    "iconImage": "/common/destiny_content/icons/icon_m030491eb0af454a1321b9557ff5cfc69.png"
  },
  "medalsUnknown": {
    "statName": "Medal: Unknown",
    "statDescription": null,
    "iconImage": null
  },
  "medalsVehicleFotcTurretKillSpree": {
    "statName": "Gunner",
    "statDescription": "In a single life, kill 5 players with a Turret.",
    "iconImage": "/common/destiny_content/icons/icon_m2ef70c179989e54471aee1f294ef3295.png"
  },
  "medalsVehicleInterceptorKillSplatter": {
    "statName": "Bulldozer",
    "statDescription": "Run over an enemy with an Interceptor.",
    "iconImage": "/common/destiny_content/icons/icon_m07e9665cac61596efbaee79026ed7cf5.png"
  },
  "medalsVehicleInterceptorKillSpree": {
    "statName": "Chariot of Fire",
    "statDescription": "In a single life, kill 5 players while driving an Interceptor.",
    "iconImage": "/common/destiny_content/icons/icon_mdb60638d8b5838cec06104204f87886b.png"
  },
  "medalsVehiclePikeKillSplatter": {
    "statName": "Skewered",
    "statDescription": "Run over an enemy with a Pike.",
    "iconImage": "/common/destiny_content/icons/icon_me2fc3f34a787ae6591eda449aeeaced2.png"
  },
  "medalsVehiclePikeKillSpree": {
    "statName": "Fallen Angel",
    "statDescription": "In a single life, kill 5 enemies while driving the Pike.",
    "iconImage": "/common/destiny_content/icons/icon_m0613e52c37406df725580fab83739fe0.png"
  },
  "medalsVehicleSparrowKillSplatter": {
    "statName": "Never Speak of This Again",
    "statDescription": "Run over an enemy with a Sparrow.",
    "iconImage": "/common/destiny_content/icons/icon_mc7e0cbb87f6b6d2e143a759844f9ca7a.png"
  },
  "medalsWeaponFusionRifleKillSpree": {
    "statName": "Master Blaster",
    "statDescription": "Kill 3 opponents with a Fusion Rifle without switching weapons or reloading.",
    "iconImage": "/common/destiny_content/icons/icon_m2201e64d9f98ea2a8d22ed03ec389bd9.png"
  },
  "medalsWeaponHandCannonHeadshotSpree": {
    "statName": "Dead Man's Hand",
    "statDescription": "In a single life, kill 3 opponents with Hand Cannon headshots.",
    "iconImage": "/common/destiny_content/icons/icon_m7b75faac50066f7aed7c9c5c3357a6d0.png"
  },
  "medalsWeaponMachineGunKillSpree": {
    "statName": "Machine Lord",
    "statDescription": "Kill 3 enemies with a Machine Gun without switching weapons or reloading.",
    "iconImage": "/common/destiny_content/icons/icon_md41b3cadbc4c6d3ec0a7d2aaf419fbe7.png"
  },
  "medalsWeaponRocketLauncherKillSpree": {
    "statName": "Splash Damage",
    "statDescription": "Kill 3 enemies with rockets in less than a second.",
    "iconImage": "/common/destiny_content/icons/icon_mde7d77b45e7c96be4b43a70b2370dead.png"
  },
  "medalsWeaponShotgunKillSpree": {
    "statName": "Buckshot Bruiser",
    "statDescription": "Kill 3 enemies with a Shotgun without switching weapons or reloading.",
    "iconImage": "/common/destiny_content/icons/icon_m12b0c60086f8ee07b9d92685e299ae4c.png"
  },
  "medalsWeaponSniperRifleHeadshotSpree": {
    "statName": "Marksman",
    "statDescription": "Kill 2 enemies with Sniper Rifle headshots without switching weapons or reloading.",
    "iconImage": "/common/destiny_content/icons/icon_mbdb0882056e3a6393e4bf6bea4b89061.png"
  },
  "medalsWinningScore": {
    "statName": "Nail in the Coffin",
    "statDescription": "Score the winning points in a match.",
    "iconImage": "/common/destiny_content/icons/icon_m12dc39d05335f02111561718f0582144.png"
  },
  "medalsActivityCompleteVictoryElimination": {
    "statName": "Trial By Fire",
    "statDescription": "Win an Elimination match.",
    "iconImage": "/common/destiny_content/icons/icon_m14dd24b9a3dc093bc91328228732bb50.png"
  },
  "medalsActivityCompleteVictoryEliminationShutout": {
    "statName": "Annihilation",
    "statDescription": "As a team, win an Elimination match without being wiped.",
    "iconImage": "/common/destiny_content/icons/icon_m9ecbbcf34149c6a1c8c845ac0d0b9091.png"
  },
  "medalsEliminationLastStandKill": {
    "statName": "Never Say Die",
    "statDescription": "Kill an enemy as the last Guardian standing on your team.",
    "iconImage": "/common/destiny_content/icons/icon_meef309ddbf708b5a5901d9179548713f.png"
  },
  "medalsEliminationLastStandRevive": {
    "statName": "From the Brink",
    "statDescription": "Revive an ally as the last Guardian standing on your team.",
    "iconImage": "/common/destiny_content/icons/icon_m2e40fd761d2d76d6be501e8f3f07cb6c.png"
  },
  "medalsEliminationWipeQuick": {
    "statName": "Ace",
    "statDescription": "As a fireteam, defeat the enemy team in the first 30 seconds of a round.",
    "iconImage": "/common/destiny_content/icons/icon_mc6d31ef5e788b733b1b3326dc23cd250.png"
  },
  "medalsEliminationWipeSolo": {
    "statName": "Wrecking Ball",
    "statDescription": "Singlehandedly wipe the enemy team.",
    "iconImage": "/common/destiny_content/icons/icon_md8545a9d8956c0ca2a700d75fa7a5f72.png"
  },
  "medalsActivityCompleteVictoryEliminationPerfect": {
    "statName": "Bulletproof",
    "statDescription": "As a team, win an Elimination match where no one on your team dies.",
    "iconImage": "/common/destiny_content/icons/icon_m7f5451453a58793961439b2c2ba9f3a9.png"
  },
  "medalsAbilityRadianceGrenadeKillMulti": {
    "statName": "Scorched Earth",
    "statDescription": "Kill 3 enemies with grenades while Radiance is active.",
    "iconImage": "/common/destiny_content/icons/icon_ma5e571c8b02316e43f2b304d04670c35.png"
  },
  "medalsSalvageProbeOffenseKillMulti": {
    "statName": "Clean Sweep",
    "statDescription": "Rapidly kill 3 enemies near their own probe.",
    "iconImage": "/common/destiny_content/icons/icon_m8886beac6bc2a3761391f0f9ab5da602.png"
  },
  "medalsActivityCompleteVictoryMercy": {
    "statName": "No Mercy",
    "statDescription": "Win a match by invoking the mercy rule.",
    "iconImage": "/common/destiny_content/icons/icon_maa4da5e99c58e51fc052997ca6e240cf.png"
  },
  "medalsKillSpreeAbsurd": {
    "statName": "We Ran out of Medals",
    "statDescription": "Defeat 25 opposing Guardians without dying.",
    "iconImage": "/common/destiny_content/icons/icon_m6f1b07d32eb09ae45b9a44da40d45a62.png"
  },
  "medalsKillSpreeNoDamage": {
    "statName": "Phantom",
    "statDescription": "Defeat 7 opposing Guardians while taking no damage.",
    "iconImage": "/common/destiny_content/icons/icon_mab1a465b2c8fc80b5f867f2486db4f81.png"
  },
  "medalsActivityCompleteSingularityPerfectRunner": {
    "statName": "Perfect Runner",
    "statDescription": "Complete a Rift match with 2 or more carries and a 100% capture rate.",
    "iconImage": "/common/destiny_content/icons/icon_mf41a75c0811f5592673f77d1a888b3e8.png"
  },
  "medalsSingularityFlagHolderKilledClose": {
    "statName": "Denied",
    "statDescription": "Defeat an enemy Spark Runner near the Rift.",
    "iconImage": "/common/destiny_content/icons/icon_m749cc44215ecc39fe3d0a5493d78e34a.png"
  },
  "medalsActivityCompleteCycle": {
    "statName": "The Cycle",
    "statDescription": "Complete a round with at least a Primary, Special, Heavy, Grenade, Melee, and Super kill.",
    "iconImage": "/common/destiny_content/icons/icon_mdb8d7a333bf5e55553107cfaa643c77e.png"
  },
  "medalsAbilityVoidBowKillMulti": {
    "statName": "Wild Hunt",
    "statDescription": "Rapidly defeat 3 opposing Guardians with Shadowshot.",
    "iconImage": "/common/destiny_content/icons/icon_mf3d36ba306e3709cde0c33a241997412.png"
  },
  "medalsAbilityThermalHammerKillMulti": {
    "statName": "Hammer and Tongs",
    "statDescription": "Defeat 3 opposing Guardians with a single Hammer of Sol activation.",
    "iconImage": "/common/destiny_content/icons/icon_m2f168c48897ba93ba070d440f7d2f701.png"
  },
  "medalsAbilityArcLightningKillMulti": {
    "statName": "Storm Bringer",
    "statDescription": "Defeat 3 opposing Guardians with a single Stormtrance activation.",
    "iconImage": "/common/destiny_content/icons/icon_mf4406ecbf05f2e6263a856c900756a6d.png"
  },
  "medalsSingularityFlagCaptureMulti": {
    "statName": "Unstoppable Force",
    "statDescription": "Capture the Spark 3 times in a single match.",
    "iconImage": "/common/destiny_content/icons/icon_m4c0c0424c25b86ccf80a73aec1fa5cd0.png"
  },
  "medalsSingularityFlagHolderKilledMulti": {
    "statName": "Immovable Object",
    "statDescription": "Defeat an opposing Spark Runner 3 times in a single match.",
    "iconImage": "/common/destiny_content/icons/icon_m02a734da81d66414c55e3f267658b47c.png"
  },
  "medalsWeaponSwordKillSpree": {
    "statName": "Sword at a Gun Fight",
    "statDescription": "Rapidly defeat 3 enemies with a Heavy Sword.",
    "iconImage": "/common/destiny_content/icons/icon_m9f8ac92b23f11d46419cb82935682b79.png"
  },
  "medalsRadianceShutdown": {
    "statName": "...And Stay Down!",
    "statDescription": "Defeat a Warlock within 3 seconds of their self-reviving with Radiance.",
    "iconImage": "/common/destiny_content/icons/icon_m7a1ba4190b056693e497d1ac1e05d6b2.png"
  },
  "medalsSingularityRunnerDefenseMulti": {
    "statName": "Clear a Path",
    "statDescription": "In a single Spark run, defeat 2 enemies who damage your team's Runner.",
    "iconImage": "/common/destiny_content/icons/icon_m36ae16c5a210ed1a3d377f38f94540a1.png"
  },
  "medalsWeaponAutoRifleKillSpree": {
    "statName": "Automatic",
    "statDescription": "In a single life, defeat 5 opposing Guardians with an Auto Rifle.",
    "iconImage": "/common/destiny_content/icons/icon_m8f1fe9c611ec24e7a1c4f58cb840555d.png"
  },
  "medalsWeaponPulseRifleKillSpree": {
    "statName": "Finger on the Pulse",
    "statDescription": "In a single life, defeat 5 opposing Guardians with a Pulse Rifle.",
    "iconImage": "/common/destiny_content/icons/icon_mb1919d9fa1432844e7c0735855e8d5d9.png"
  },
  "medalsWeaponScoutRifleKillSpree": {
    "statName": "Scout's Honor",
    "statDescription": "In a single life, defeat 5 opposing Guardians with a Scout Rifle.",
    "iconImage": "/common/destiny_content/icons/icon_m19f521f962f4aed842251ca89c508196.png"
  },
  "medalsWeaponSidearmKillSpree": {
    "statName": "Sidekick",
    "statDescription": "In a single life, defeat 3 opposing Guardians with a Sidearm.",
    "iconImage": "/common/destiny_content/icons/icon_me8f0611a5aba8cc115e2eb5485373b7d.png"
  },
  "medalsZoneCapturedBInitial": {
    "statName": "B-Line",
    "statDescription": "In a Control match, capture Zone B first.",
    "iconImage": "/common/destiny_content/icons/icon_me39f3c3f3ed3565184b9fb666b22f8b3.png"
  },
  "medalsPaybackKill": {
    "statName": "Payback",
    "statDescription": "Defeat the opposing Guardian who killed you last.",
    "iconImage": "/common/destiny_content/icons/icon_mbc31aa22e2fd55d1e79a77274f39eb65.png"
  },
  "medalsAvenger": {
    "statName": "Avenger",
    "statDescription": "Avenge a defeated teammate.",
    "iconImage": "/common/destiny_content/icons/icon_m324a5681ecdd1ff57498932167c794b3.png"
  },
  "medalsSupremacyMostSelfConfirms": {
    "statName": "I'll Do It Myself",
    "statDescription": "Complete a Supremacy match with the highest number of crests seized from opponents you personally defeat.",
    "iconImage": "/common/destiny_content/icons/icon_m533e615efb9d77d16bd03c2c8ff98722.png"
  },
  "medalsSupremacyConfirmStreakLarge": {
    "statName": "And For a Few Crests More",
    "statDescription": "In a single life, seize 7 opponents' Crests.",
    "iconImage": "/common/destiny_content/icons/icon_m39cf6e388909f0dd8bfb690275690f25.png"
  },
  "medalsSupremacyMulti": {
    "statName": "Pick Up the Pieces",
    "statDescription": "Rapidly seize 3 opponents' Crests.",
    "iconImage": "/common/destiny_content/icons/icon_m1412fe7eb73af38880eb84762a8d6494.png"
  },
  "medalsSupremacyDenyMulti": {
    "statName": "Honor Guard",
    "statDescription": "Recover 3 crests from allied Guardians in rapid succession.",
    "iconImage": "/common/destiny_content/icons/icon_m64691916be6002f23440d091e573ef06.png"
  },
  "medalsSupremacyMostConfirms": {
    "statName": "Mine! All Mine!",
    "statDescription": "Complete a Supremacy match with the highest number of crests seized.",
    "iconImage": "/common/destiny_content/icons/icon_mf9a1198df6b7ed5e54f130a796a00abe.png"
  },
  "medalsSupremacyMostDenies": {
    "statName": "Hands Off",
    "statDescription": "Complete a Supremacy match with the most allied crests recovered.",
    "iconImage": "/common/destiny_content/icons/icon_mcbbfc2197c1e434eb8e6437a8843f4a9.png"
  },
  "medalsSupremacy": {
    "statName": "A Fistful of Crests…",
    "statDescription": "In a single life, seize 3 crests from opposing Guardians.",
    "iconImage": "/common/destiny_content/icons/icon_mef38ae2990a2b7b089cf6a5eaeb98fc5.png"
  },
  "medalsSupremacySelfDeny": {
    "statName": "Never Mind, Found It",
    "statDescription": "Recover your own crest in a Supremacy match.",
    "iconImage": "/common/destiny_content/icons/icon_m7ed9265ba017d386719608c5f87a64ef.png"
  },
  "medalsSupremacyNeverCollected": {
    "statName": "Never Gonna Get It",
    "statDescription": "Complete a Supremacy match without losing your crest to an opponent.",
    "iconImage": "/common/destiny_content/icons/icon_md98c9a033d6f285bdc29f0e9908aefb3.png"
  }
};

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
