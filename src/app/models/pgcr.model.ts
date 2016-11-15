export interface PGCR {
  id: number,
  period: string,
  activityDetails: {
    referenceId: number,
    instanceId: string,
    mode: number
  },
  values: {
    assists: Value,
    kills: Value,
    deaths: Value,
    team: Value,
    standing: Value
  },
  entries: Entry[]
}

export interface Entry {
  standing: number,
  score: Value,
  characterId: string
}

export interface Value {
  statId: string,
  basic: {
    value: number,
    displayValue: string
  }
}
