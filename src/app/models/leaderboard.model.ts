export interface LBWeaponType {
  id: string;
  name: string;
  icon: string;
  kills: string;
  headshots: string;
  matches: string;
  tier: number;
  type: number;
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
}

export interface LeaderboardSelectList {
  id: any;
  statId?: string;
  text: string;
}
