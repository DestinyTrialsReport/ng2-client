export interface DTRStats {
  membershipId: string;
  membershipType: number;
  displayName: string;
  streak: number;
  flawless: number;
  badges: Badge[];
  recentMatches: Match[];
  year1: SummarizedStats;
  year2: SummarizedStats;
  year3: SummarizedStats;
  currentWeek: SummarizedStats;
  currentMap: SummarizedStats;
  recentTeammates: Teammate[];
}

export interface Teammate {
  membershipId: string;
  displayName: string;
  membershipType: number;
}

export interface Match {
  characterId: string;
  instanceId: string;
  period: string;
  standing: number;
  kills: number;
  deaths: number;
}

export interface Badge {
  status: string;
  description: string;
  icon: string;
}

export interface SummarizedWeapons {
  itemTypeName: string;
  sum_kills: number;
  sum_headshots: number;
  file_name: string;
}

export interface SummarizedStats {
  flawless?: number;
  matches: number;
  losses: number;
  kills: number;
  deaths: number;
  weapons: SummarizedWeapons[];
}

export interface Flawless {
  count: number;
}

export interface GGGStats {
  elo: number;
  rank: number
}

export interface BNGStats {
  activitiesWon: StatValue;
  activitiesEntered: StatValue;
  killsDeathsRatio: StatValue;
  kills: StatValue;
  deaths: StatValue;
  assists: StatValue;
  totalActivityDurationSeconds: StatValue;
  score: StatValue;
  allParticipantsScore: StatValue;
  averageKillDistance: StatValue;
  activitiesWinPercentage: StatValue;
  weaponKillsSuper: StatValue;
  weaponKillsMelee: StatValue;
  weaponKillsGrenade: StatValue;
  abilityKills: StatValue;
  totalDeathDistance: StatValue;
  averageDeathDistance: StatValue;
  totalKillDistance: StatValue;
  secondsPlayed: StatValue;
  averageLifespan: StatValue;
  averageScorePerKill: StatValue;
  averageScorePerLife: StatValue;
  bestSingleGameKills: StatValue;
  bestSingleGameScore: StatValue;
  closeCalls: StatValue;
  dominationKills: StatValue;
  killsDeathsAssists: StatValue;
  objectivesCompleted: StatValue;
  precisionKills: StatValue;
  resurrectionsPerformed: StatValue;
  resurrectionsReceived: StatValue;
  suicides: StatValue;
  weaponKillsAutoRifle: StatValue;
  weaponKillsFusionRifle: StatValue;
  weaponKillsHandCannon: StatValue;
  weaponKillsMachinegun: StatValue;
  weaponKillsPulseRifle: StatValue;
  weaponKillsRocketLauncher: StatValue;
  weaponKillsScoutRifle: StatValue;
  weaponKillsShotgun: StatValue;
  weaponKillsSniper: StatValue;
  weaponKillsSubmachinegun: StatValue;
  weaponKillsRelic: StatValue;
  weaponKillsSideArm: StatValue;
  weaponKillsSword: StatValue;
  weaponBestType: StatValue;
  winLossRatio: StatValue;
  allParticipantsCount: StatValue;
  allParticipantsTimePlayed: StatValue;
  defensiveKills: StatValue;
  longestKillSpree: StatValue;
  longestSingleLife: StatValue;
  mostPrecisionKills: StatValue;
  offensiveKills: StatValue;
  orbsDropped: StatValue;
  orbsGathered: StatValue;
  relicsCaptured: StatValue;
  remainingTimeAfterQuitSeconds: StatValue;
  teamScore: StatValue;
  zonesCaptured: StatValue;
  zonesNeutralized: StatValue;
  combatRating: StatValue;
  longestKillDistance: StatValue;
  highestCharacterLevel: StatValue;
  highestLightLevel: StatValue;
}

export interface StatValue {
  statId: string;
  basic: {
    value: number;
    displayValue: string;
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
