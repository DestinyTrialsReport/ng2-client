export interface ItemDefinitions {
  [hash:number]: ItemDefinition
}

export interface TalentDefinitions {
  [hash:number]: Talent[]
}

export interface StepsDefinitions {
  [hash:number]: Step
}

export interface ItemDefinition {
  n: string,
  i: string,
  tT: number,
  hazard: string
}

export interface Talent {
  h:  number,
  n:  number,
  r:  number,
  c:  number,
  s:  number[]
}

export interface Step {
  n:  string,
  h:  number,
  d:  string,
  i:  string,
  p:  number[],
  pr: number,
  g:  number
}
