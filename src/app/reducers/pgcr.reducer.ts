/* tslint:disable: no-switch-case-fall-through */
import {PGCR, Extended, ExtendedWeapons, WeaponValue, Medal, Values, ValuesR, WeaponValueR} from "../models/pgcr.model";
import * as pgcr from "../actions/pgcr.actions";
import {Observable} from "rxjs";
import {MEDAL_DEFINITIONS} from "../services/constants";
import {ItemDefinitions} from "../models/manifest.model";


export interface State {
  collection: { [instanceId: string]: PGCR };
  player1: {values: ValuesR;weapons:WeaponValueR;medals:{[key:string]: Medal}};
  player2: {values: ValuesR;weapons:WeaponValueR;medals:{[key:string]: Medal}};
  player3: {values: ValuesR;weapons:WeaponValueR;medals:{[key:string]: Medal}};
}

const initialState: State = {
  collection: {},
  player1: null,
  player2: null,
  player3: null
};

export function reducer(state = initialState, action: pgcr.Actions): State {
  switch (action.type) {

    case pgcr.ActionTypes.STORE_PGCR: {
      const playerId: string = action.payload['player'];
      const matches: any = action.payload['matches'];
      const definitions: ItemDefinitions = action.payload['definitions'];
      const extended = matches.map(match => match.extended);
      const values = matches.map(match => Object.assign({}, match.values, {
        precisionKills: match.extended.values.precisionKills ? match.extended.values.precisionKills : {basic: {value: 0}},
        resurrectionsPerformed: match.extended.values.resurrectionsPerformed ? match.extended.values.resurrectionsPerformed : {basic: {value: 0}},
        averageLifespan: match.extended.values.averageLifespan ? match.extended.values.averageLifespan : {basic: {value: 0}},
      }));
      const extendedMedals = extended
        .map(extended => Object.keys(extended.values)
          .filter(key => key.substring(0, 6) === 'medals')
          .reduce((medals: {[name:string]: number}, medal: string) => Object.assign(medals, {[medal]: extended.values[medal].basic.value}), {})
        );
      const medalKeys = extendedMedals.reduce((medalKeysArray: string[], medals: {[name:string]: number}) => [...medalKeysArray, ...Object.keys(medals)], []);

      const extendedWeapons = extended.reduce((weaponsArray: number[], extended: Extended) => [...weaponsArray, ...extended.weapons], []);
      const sumWeapons = extendedWeapons.reduce((weapons: {[id: number]: WeaponValue}, weapon: ExtendedWeapons) => {
        const values = extendedWeapons.filter(weapons => weapons.referenceId == weapon.referenceId).map(weapons => weapons.values);
        return Object.assign(weapons, {
          [weapon.referenceId]: values.reduce((a: WeaponValueR, b: WeaponValue) => {
            return {
              name: definitions[weapon.referenceId].n,
              icon: definitions[weapon.referenceId].i,
              uniqueWeaponKills: b.uniqueWeaponKills.basic.value + a.uniqueWeaponKills,
              uniqueWeaponKillsPrecisionKills: b.uniqueWeaponKillsPrecisionKills.basic.value + a.uniqueWeaponKillsPrecisionKills,
              uniqueWeaponPrecisionKills: b.uniqueWeaponPrecisionKills.basic.value + a.uniqueWeaponPrecisionKills
            }
          }, {
            uniqueWeaponKills: 0,
            uniqueWeaponKillsPrecisionKills: 0,
            uniqueWeaponPrecisionKills: 0
          })
        });
      }, {});

      const initialMedals = medalKeys.reduce((newObject, key) => Object.assign(newObject, {[key]: {value: 0}}), {});
      const sumMedals = extendedMedals.reduce((medals, medal) => {
        const medalValues = medalKeys.reduce((newObject: {[key:string]: Medal}, key: string) => Object.assign(newObject, {
          [key]: {
            value: (medal[key] ? medal[key] : 0) + medals[key].value,
            name: MEDAL_DEFINITIONS[key]['statName'],
            description: MEDAL_DEFINITIONS[key]['statDescription'],
            icon: MEDAL_DEFINITIONS[key]['iconImage']
          }
        }), {});

        return Object.assign(medals, medalValues);
      }, initialMedals);

      const summary = values.reduce((a: ValuesR, b: Values) => {
        return {
          assists: b.assists.basic.value + a.assists,
          kills: b.kills.basic.value + a.kills,
          activityDurationSeconds: b.activityDurationSeconds.basic.value + a.activityDurationSeconds,
          averageScorePerKill: b.averageScorePerKill.basic.value + a.averageScorePerKill,
          averageScorePerLife: b.averageScorePerLife.basic.value + a.averageScorePerLife,
          deaths: b.deaths.basic.value + a.deaths,
          killsDeathsAssists: b.killsDeathsAssists.basic.value + a.killsDeathsAssists,
          killsDeathsRatio: b.killsDeathsRatio.basic.value + a.killsDeathsRatio,
          precisionKills: b.precisionKills.basic.value + a.precisionKills,
          resurrectionsPerformed: b.resurrectionsPerformed.basic.value + a.resurrectionsPerformed,
          averageLifespan: b.averageLifespan.basic.value + a.averageLifespan,
        }
      }, {
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
      });

      const updated: any = Object.assign({}, state[playerId], {
        values: summary,
        weapons: sumWeapons,
        medals: sumMedals
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? updated : state.player1,
        player2: playerId == 'player2' ? updated : state.player2,
        player3: playerId == 'player3' ? updated : state.player3
      });
    }

    default: {
      return state;
    }
  }
}

export function getCollection(state$: Observable<State>) {
  return state$.select(state => state.collection);
}
