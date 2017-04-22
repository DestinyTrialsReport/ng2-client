import {BNGStats, DTRStats, GGGStats, Match, SummarizedStats, Teammate} from "./stats.model";
import {Item} from "./inventory.model";

export interface Player {
  displayName: string;
  membershipId: string;
  membershipType: number;
  characterId: string;
  characters: Character[];
  stats: Stats;
  header: PlayerHeader;
  intro: PlayerIntro;
  summarized: Summarized;
  equipped: EquippedItems;
  classStats: ClassStat[];
  recentTeammates: Teammate[];
  opponentHistory?: opponentHistory;
}

export interface EquippedItems {
  weapons:    Item[];
  armor:      Item[];
  artifact:   Item[];
  subclass:   Item[];
}

export interface Streak {
  longest: number;
  current: number;
}

export interface Summarized {
  week: SummarizedStats;
  map: SummarizedStats;
}

export interface PlayerIntro {
  matches: Match[];
  winPercentage: number;
  streak: Streak;
  kd: {
    bungie: number;
    week: number;
    year1: number;
    year2: number;
    year3: number;
  };
  flawless: {
    year1: number;
    year2: number;
    year3: number;
  };
}

export interface PlayerHeader {
  name: string;
  subclass: Item;
  emblem: string;
  background: string;
  level: number;
  grimoire: number;
  badges?: Badge[];
}

export interface Stats {
  bungie: BNGStats;
  trials: DTRStats;
  guardian: GGGStats;
}

export interface Badge {
  status: string;
  description: string;
  icon: string;
}

export interface opponentHistory {
  matches: number;
  instanceIds: string[];
  losses: number;
  wins: number;
  playerKd: number;
  opponentKd: number
}

export interface Opponent {
  membershipId: string;
  instanceId: string;
  standing: string;
  pkills: string;
  pdeaths: string;
  okills: string;
  odeaths: string;
}

export interface Character {
  characterBase: {
    characterId: string;
    powerLevel: number;
    grimoireScore: number;
    stats: ClassStat[];
  };
  emblemPath: string;
  backgroundPath: string;
  membershipId?: string;
  membershipType?: number;
  displayName?: string;
}

export interface ClassStat {
  name: string;
  value: number;
  normalized: number;
  tier?: number;
  tiers?: number[];
  cooldown?: number;
  percentage: number;
  remaining?: number;
}
