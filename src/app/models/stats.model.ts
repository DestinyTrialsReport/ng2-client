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
  activitiesWon: StatValue,
  activitiesEntered: StatValue,
  killsDeathsRatio: StatValue
}

export interface StatValue {
  statId: string,
  basic: {
    value: number,
    displayValue: string
  }
}


// getTier() {
//   let elo = this.seasonTwo;
//   if (elo < 1100) return 'bronze';
//   if (elo < 1300) return 'silver';
//   if (elo < 1500) return 'gold';
//   if (elo < 1700) return 'platinum';
//   return 'diamond';
// };

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
