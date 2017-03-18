export interface Player {
  displayName: string,
  membershipId: string,
  membershipType: number,
  characterBase: {
    characterId: string,
    powerLevel: number,
    grimoireScore: number,
    stats: ClassStat[]
  },
  emblemPath: string,
  backgroundPath: string,
  badges: Badge[],
  opponents: Opponent[],
  characters: Character[]
}

export interface Badge {
  status: string,
  description: string,
  icon: string
}

export interface Opponent {
  membershipId: string,
  instanceId: string,
  standing: string
}

export interface Character {
  characterBase: {
    characterId: string;
    powerLevel: number;
    grimoireScore: number;
    stats: ClassStat[];
  },
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
