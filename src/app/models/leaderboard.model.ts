export interface LBWeaponType {
  id: string;
  name: string;
  icon: string;
  kills: string;
  headshots: string;
  matches: string;
  tier: number;
  type: number;
  count?: string;
  medalId?: string;
  players?: string;
  map?: string;
}

export interface LBWeaponPercentage {
  name: string;
  icon: string;
  percentage: string;
  tier: number;
  bucketTypeHash: string;
}

export interface SelectedLeaderboardItems {
  leaderboard: string;
  icon: string;
  type: any;
  player: string;
  platform: number;
  tier: number;
  page: number;
  map?: string;
}

export interface LeaderboardSelectList {
  id: any;
  statId?: string;
  text: string;
}
