export interface Activity {
  id: number,
  period: string,
  activityDetails: {
    referenceId: number,
    instanceId: string,
    mode: number
  },
  values: {
    assists: ActivityValue,
    kills: ActivityValue,
    deaths: ActivityValue,
    team: ActivityValue,
    standing: ActivityValue
  }
}

export interface ActivityValue {
  statId: string,
  basic: {
    value: number,
    displayValue: string
  }
}
