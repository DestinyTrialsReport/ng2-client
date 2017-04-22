/* tslint:disable: no-switch-case-fall-through */
import { createSelector } from 'reselect';
import {
  PGCR, ExtendedWeapons, WeaponValue, Medal, ValuesR, WeaponValueR
} from "../models/pgcr.model";
import {MEDAL_DEFINITIONS} from "../services/constants";

import * as pgcr from "../actions/pgcr.actions";

export interface State {
  collection: { [instanceId: string]: PGCR };
  player1: PgcrPlayerState;
  player2: PgcrPlayerState;
  player3: PgcrPlayerState;
}

export interface PgcrSummary {
  standing: number;
  teamScore: number;
  enemyScore: number;
  period: string;
}

export interface PgcrPlayerState {
  summary: PgcrSummary[]
  values: ValuesR;
  weapons:{[weaponId:number]: WeaponValueR};
  medals:{[key:string]: Medal}
}

const initialValues: ValuesR = {
  assists: 0,
  kills: 0,
  activityDurationSeconds: 0,
  averageScorePerKill: 0,
  averageScorePerLife: 0,
  deaths: 0,
  killsDeathsAssists: 0,
  killsDeathsRatio: 0,
  precisionKills: 0,
  resurrectionsPerformed: 0,
  averageLifespan: 0,
};

const initialPlayer: PgcrPlayerState = {
  summary: [],
  values: initialValues,
  weapons: {},
  medals: {}
};

const initialState: State = {
  collection: {},
  player1: initialPlayer,
  player2: initialPlayer,
  player3: initialPlayer
};

export function reducer(state = initialState, action: pgcr.Actions): State {
  switch (action.type) {

    case pgcr.ActionTypes.STORE_PGCR: {
      const match = action.payload['match'];
      const playerId = action.payload['pIndex'].toLowerCase();
      const payload = action.payload.pgcr;
      const teams = payload['teams'];
      const entry = payload['entries'].find(entry => entry.characterId === action.payload.characterId);
      const basicValues = entry.values;
      const extendedValues = entry.extended.values;
      const extendedWeapons = entry.extended.weapons;
      const playerTeam = basicValues.team.basic.value;
      const teamScore = teams.find(teams => teams.teamId == playerTeam);
      const enemyScore = teams.find(teams => teams.teamId != playerTeam);

      const summary =  Object.assign({}, state[playerId].summary, {
        standing: entry.standing,
        teamScore: teamScore ? teamScore.score.basic.value : 0,
        enemyScore: enemyScore ? enemyScore.score.basic.value : 0,
        period: payload.period
      });

      const values = Object.assign({}, {
          assists: basicValues.assists.basic.value + state[playerId].values.assists,
          kills: basicValues.kills.basic.value + state[playerId].values.kills,
          activityDurationSeconds: basicValues.activityDurationSeconds.basic.value + state[playerId].values.activityDurationSeconds,
          averageScorePerKill: basicValues.averageScorePerKill.basic.value + state[playerId].values.averageScorePerKill,
          averageScorePerLife: basicValues.averageScorePerLife.basic.value + state[playerId].values.averageScorePerLife,
          deaths: basicValues.deaths.basic.value + state[playerId].values.deaths,
          killsDeathsAssists: basicValues.killsDeathsAssists.basic.value + state[playerId].values.killsDeathsAssists,
          killsDeathsRatio: basicValues.killsDeathsRatio.basic.value + state[playerId].values.killsDeathsRatio,
          // precisionKills: (extendedValues.precisionKills ? extendedValues.precisionKills.basic.value : 0) + state[playerId].values.precisionKills,
          // resurrectionsPerformed: (extendedValues.resurrectionsPerformed ? extendedValues.resurrectionsPerformed.basic.value : 0) + state[playerId].values.resurrectionsPerformed,
          averageLifespan: (extendedValues.averageLifespan ? extendedValues.averageLifespan.basic.value : 0) + state[playerId].values.averageLifespan,
      });

      const weapons = extendedWeapons ? extendedWeapons.reduce((weaponsUsed: {[id: number]: WeaponValue}, weapon: ExtendedWeapons) => {
        const weaponInState = state[playerId].weapons[weapon.referenceId];
        return Object.assign(weaponsUsed, {
          [weapon.referenceId]: {
            uniqueWeaponKills: weapon.values.uniqueWeaponKills.basic.value + (weaponInState ? weaponInState.uniqueWeaponKills : 0),
            uniqueWeaponKillsPrecisionKills: weapon.values.uniqueWeaponKillsPrecisionKills.basic.value + (weaponInState ? weaponInState.uniqueWeaponKillsPrecisionKills : 0),
            uniqueWeaponPrecisionKills: weapon.values.uniqueWeaponPrecisionKills.basic.value + (weaponInState ? weaponInState.uniqueWeaponPrecisionKills : 0),
          }
        });
      }, {}) : {};

      const medals = Object.keys(extendedValues)
        .filter(key => key.substring(0, 6) === 'medals')
        .reduce((medals: {[name:string]: number}, medal: string) => {
          const medalInState = state[playerId].medals[medal];
          return Object.assign(medals, {
            [medal]: {
              value: extendedValues[medal].basic.value + (medalInState ? medalInState.value : 0),
              name: MEDAL_DEFINITIONS[medal]['statName'],
              description: MEDAL_DEFINITIONS[medal]['statDescription'],
              icon: MEDAL_DEFINITIONS[medal]['iconImage']
            }
          })
        }, {});

      const updated: any = Object.assign({}, state[playerId], {
        summary: [...state[playerId].summary, ...summary]
          .sort(function (a, b) {
            if (a.period > b.period) {
              return 1;
            }
            if (a.period < b.period) {
              return -1;
            }
            return 0;
          }),
        values: Object.assign({}, state[playerId].values, values),
        weapons: Object.assign({}, state[playerId].weapons, weapons),
        medals: Object.assign({}, state[playerId].medals, medals),
      });

      return Object.assign({}, state, {
        [playerId]: updated
      });
    }

    default: {
      return state;
    }
  }
}

export function pgcrSelectorFactory(index) {
  return createSelector(
    (state: State) => state,
    state => state[`player${index}`]
  );
}
