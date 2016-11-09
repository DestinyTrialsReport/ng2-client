export interface Inventory {
  bucketHash: number,
  weapons:    Item[],
  armor:      Item[],
  subclass:   Item,
  items:      Item[]
}

export interface Item {
  tierType: number,
  itemHash: number,
  itemLevel: number,
  stats: any,
  perks: any,
  talentGridHash: number,
  damage: number,
  bucketHash: number,
  nodes: ItemNode[],
  steps?: Step[],
  name?: string,
  icon?: string,
  description?: string,
  tier?: number,
  n?: string,
  i?: string,
  tT?: number,
}


export interface ItemNode {
  isActivated: boolean,
  stepIndex: number,
  nodeHash: number
}

export interface Step {
  n:  string,
  h:  number,
  d:  string,
  i:  string,
  p:  number[],
  pr: number,
  g:  number,
  c:  number,
  r:  number
}
