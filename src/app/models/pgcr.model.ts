export interface PGCR {
  id: number,
  period: string,
  activityDetails: {
    referenceId: number,
    instanceId: string,
    mode: number
  },
  entries: Entry[]
}

export interface Entry {
  standing: number,
  score: Value,
  characterId: string,
  values: Values,
  extended: Extended
}

export interface Values {
  team: Value;
  standing: Value;
  assists: Value;
  kills: Value;
  activityDurationSeconds: Value;
  averageScorePerKill: Value;
  averageScorePerLife: Value;
  deaths: Value;
  killsDeathsAssists: Value;
  killsDeathsRatio: Value;
  precisionKills: Value;
  resurrectionsPerformed: Value;
  averageLifespan: Value;
}

export interface ValuesR {
  team: number;
  standing: number;
  assists: number;
  kills: number;
  activityDurationSeconds: number;
  averageScorePerKill: number;
  averageScorePerLife: number;
  deaths: number;
  killsDeathsAssists: number;
  killsDeathsRatio: number;
  precisionKills: number;
  resurrectionsPerformed: number;
  averageLifespan: number;
}

export interface Value {
  statId: string,
  basic: {
    value: number,
    displayValue: string
  }
}

export interface Extended {
  weapons: ExtendedWeapons[];
  values: {
    averageLifespan: Value;
  }
}

export interface ExtendedWeapons {
  referenceId: number;
  values: WeaponValue;
}

export interface WeaponValue {
  name?: string;
  icon?: string;
  uniqueWeaponKills: Value;
  uniqueWeaponPrecisionKills: Value;
  uniqueWeaponKillsPrecisionKills: Value;
}

export interface WeaponValueR {
  uniqueWeaponKills: number;
  uniqueWeaponPrecisionKills: number;
  uniqueWeaponKillsPrecisionKills: number;
}

export interface Medal {
  value: number;
  name: string;
  description: string;
  icon: string;
}
