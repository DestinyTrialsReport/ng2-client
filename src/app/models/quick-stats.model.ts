// export class DtrStats {
//   kills: number;
//   deaths: number;
//   matches: number;
//   flawless: Flawless;
//   kd: number;
//
//   constructor(response:any) {
//     if (response[0]) {
//       this.kills = parseInt(response[0].kills);
//       this.deaths = parseInt(response[0].deaths);
//       this.matches = parseInt(response[0].matches);
//       // this.streak = new Streak(response[0].streak);
//       this.flawless = new Flawless(response[0].flawless.years);
//       let deaths = this.deaths == 0 ? 1 : this.deaths;
//       this.kd = this.kills / deaths;
//     }
//   }
// }
//
// export class Flawless {
//   yearOne: number;
//   yearTwo: number;
//
//   constructor(years:any) {
//     this.yearOne = parseInt(years['1'].count);
//     this.yearTwo = parseInt(years['2'].count);
//   }
//
//   total() {
//     return this.yearOne + this.yearTwo;
//   }
// }

export class GuardianStats {
  seasonOne: number;
  seasonTwo: number;
  tier: string;

  constructor(response:any) {
    this.seasonOne = parseInt(response.seasonOneElo);
    this.seasonTwo = parseInt(response.elo);
    this.tier = this.getTier();
  }

  getTier() {
    let elo = this.seasonTwo;
    if (elo < 1100) return 'bronze';
    if (elo < 1300) return 'silver';
    if (elo < 1500) return 'gold';
    if (elo < 1700) return 'platinum';
    return 'diamond';
  };
}

// export class GuardianWeapons {
//   primary: GuardianWeapon[];
//   special: GuardianWeapon[];
//   heavy: GuardianWeapon[];
//
//   constructor(response:any) {
//     if (response) {
//       let primary:any  = [];
//       let special:any  = [];
//
//       if (response.primary) {
//         _.each(response.primary, function (weapon) {
//           primary.push(new GuardianWeapon(weapon))
//         })
//       }
//
//       if (response.special) {
//         _.each(response.special, function (weapon) {
//           special.push(new GuardianWeapon(weapon))
//         })
//       }
//
//       this.primary = primary;
//       this.special = special;
//     }
//
//   }
// }

export class GuardianWeapon {
  hash: number;
  name: string;
  tier: number;
  icon: string;
  day: string;
  kills: number;
  precisionKills: number;
  uses: number;

  constructor(data:any) {
    this.hash = data.hash;
    this.name = data.name;
    this.tier = data.tier;
    this.icon = 'https://www.bungie.net' + data.icon;
    this.day = data.day;
    this.kills = data.kills;
    this.precisionKills = data.precisionKills;
    this.uses = data.uses;
  }
}
//
// export class BngStats {
//   killsDeathsRatio: number;
//   activitiesWon: number;
//   activitiesEntered: number;
//   activitiesWinPercentage: number;
//   // weaponKillsSuper: number;
//   // weaponKillsMelee: number;
//   // weaponKillsGrenade: number;
//   // abilityKills: number;
//   // assists: number;
//   // totalDeathDistance: number;
//   // averageDeathDistance: number;
//   // totalKillDistance: number;
//   // kills: number;
//   // averageKillDistance: number;
//   // secondsPlayed: number;
//   // deaths: number;
//   // averageLifespan: number;
//   // score: number;
//   // averageScorePerKill: number;
//   // averageScorePerLife: number;
//   // bestSingleGameKills: number;
//   // bestSingleGameScore: number;
//   // closeCalls: number;
//   // dominationKills: number;
//   // killsDeathsAssists: number;
//   // objectivesCompleted: number;
//   // precisionKills: number;
//   // resurrectionsPerformed: number;
//   // resurrectionsReceived: number;
//   // suicides: number;
//   // weaponKillsAutoRifle: number;
//   // weaponKillsFusionRifle: number;
//   // weaponKillsHandCannon: number;
//   // weaponKillsMachinegun: number;
//   // weaponKillsPulseRifle: number;
//   // weaponKillsRocketLauncher: number;
//   // weaponKillsScoutRifle: number;
//   // weaponKillsShotgun: number;
//   // weaponKillsSniper: number;
//   // weaponKillsSubmachinegun: number;
//   // weaponKillsRelic: number;
//   // weaponKillsSideArm: number;
//   // weaponKillsSword: number;
//   // weaponBestType: number;
//   // winLossRatio: number;
//   // allParticipantsCount: number;
//   // allParticipantsScore: number;
//   // allParticipantsTimePlayed: number;
//   // defensiveKills: number;
//   // longestKillSpree: number;
//   // longestSingleLife: number;
//   // mostPrecisionKills: number;
//   // offensiveKills: number;
//   // orbsDropped: number;
//   // orbsGathered: number;
//   // relicsCaptured: number;
//   // remainingTimeAfterQuitSeconds: number;
//   // teamScore: number;
//   // totalActivityDurationSeconds: number;
//   // zonesCaptured: number;
//   // zonesNeutralized: number;
//   // combatRating: number;
//   // longestKillDistance: number;
//   // highestCharacterLevel: number;
//   // highestLightLevel: number;
//   // activitiesWinPercentage: number;
//
//   constructor(response:any) {
//     if (response && response.trialsOfOsiris) {
//       let trials = response.trialsOfOsiris;
//       let stats = trials.allTime;
//       if (stats) {
//         this.activitiesWon = stats.activitiesWon.basic.value;
//         this.activitiesEntered = stats.activitiesEntered.basic.value;
//         this.killsDeathsRatio = stats.killsDeathsRatio.basic.value;
//         if (this.activitiesWon && this.activitiesEntered) {
//           this.activitiesWinPercentage = 100 * (this.activitiesWon / this.activitiesEntered);
//         }
//       }
//     }
//   }
// }
