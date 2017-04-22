/* tslint:disable: no-switch-case-fall-through */
import {
  Player, Character, Stats, PlayerHeader, Summarized, PlayerIntro, EquippedItems,
  ClassStat, opponentHistory
} from "../models/player.model";
import {EQUIPPED_BUCKETS, WEAPON_BUCKETS, ARMOR_BUCKETS, ARTIFACT_BUCKET, EXOTIC_ARMOR} from "../services/constants";

import * as player from "../actions/player.actions";
import * as stats from "../actions/stats.actions";
import * as inventory from "../actions/inventory.actions";
import {Teammate} from "../models/stats.model";
import {Item} from "../models/inventory.model";


export interface State {
  displayName: string;
  membershipId: string;
  membershipType: number;
  characterId: number;
  characters: Character[];
  stats: Stats;
  header: PlayerHeader;
  intro: PlayerIntro;
  summarized: Summarized;
  equipped: EquippedItems;
  classStats: ClassStat[];
  recentTeammates: Teammate[];
  opponentHistory?: opponentHistory;
}

const initialState: State = {
  displayName: null,
  membershipId: null,
  membershipType: null,
  characterId: null,
  characters: [],
  stats: null,
  header: null,
  intro: null,
  summarized: null,
  equipped: null,
  classStats: [],
  recentTeammates: [],
  opponentHistory: null
};

export function createPlayerWithIndex(playerId = '') {
  return function reducer(state = initialState, action: player.Actions): State {
    switch (action.type) {

      // case myPlayer.ActionTypes.SEARCH_MY_COMPLETE:
      case player.ActionTypes[`ACCOUNT_${playerId}`]: {
        if (!action.payload) {
          return state;
        }

        if (playerId != 'PLAYER1') {
          return initialState;
        } else {
          return state
        }
      }

      case player.ActionTypes[`SEARCH_COMPLETE_PLAYER1`]: {
        if (!action.payload) {
          return state;
        }

        if (playerId != 'PLAYER1') {
          return initialState;
        } else {
          return Object.assign({}, initialState, {
            header: {
              name: action.payload['displayName']
            }
          });
        }
      }

      case player.ActionTypes[`ACCOUNT_SUCCESS_${playerId}`]: {
        const character: Character = action.payload['characters'][0];

        const updated: Player = Object.assign({}, state, {
          header: Object.assign({}, state.header, {
            emblem: character.emblemPath,
            background: character.backgroundPath,
            level: character.characterBase.powerLevel,
            grimoire: character.characterBase.grimoireScore
          }),
          classStats: character.characterBase.stats,
          characterId: character.characterBase.characterId
        });

        return Object.assign({}, state, updated);
      }

      // case player.ActionTypes.OPPONENTS_FOUND: {
      //   const playerId = action.payload[1];
      //   const opponentHistory = action.payload[0];
      //   if (opponentHistory.length < 1) {
      //     return state;
      //   }
      //
      //   const summedHistory = (obj) => Object.keys(opponentHistory).reduce((acc, value) => acc + obj[value], 0);
      //
      //   // const sum = Object.keys(opponentHistory).map(key => {
      //   //   return {
      //   //     [key]: opponentHistory[key].reduce((total, current) => {
      //   //       return total + parseInt(current);
      //   //     }, 0)
      //   //   }
      //   // });
      //
      //   return Object.assign({}, state, {
      //     // [playerId]: Object.assign({}, state[playerId], {
      //     opponentHistory: {
      //       matches: opponentHistory.length,
      //       instanceIds: opponentHistory.map(opponent => {
      //         return {
      //           id: opponent.instanceId,
      //           standing: parseInt(opponent.standing) > 0 ? 'Lost' : 'Won'
      //         }
      //       }),
      //       losses: summedHistory['standing'],
      //       wins: opponentHistory.length - summedHistory['standing'],
      //       playerKd: summedHistory['pkills'] / Math.max(1, summedHistory['pdeaths']),
      //       opponentKd: summedHistory['okills'] / Math.max(1, summedHistory['odeaths'])
      //     }
      //     // })
      //   });
      // }
      //
      //
      //
      case stats.ActionTypes[`BNG_STATS_${playerId}_SUCCESS`]: {
        const payload = action.payload;
        const activitiesWon = payload['activitiesWon'];
        const activitiesEntered = payload['activitiesEntered'];
        const killsDeathsRatio = payload['killsDeathsRatio'];
        const kd = {
          bungie: killsDeathsRatio['basic']['value']
        };

        if (!payload) {
          return state;
        }

        return Object.assign({}, state, {
          intro: Object.assign({}, state.intro, {
            winPercentage: 100 * (activitiesWon['basic']['value'] / activitiesEntered['basic']['value']),
            kd: state.intro && state.intro.kd ? Object.assign({}, state.intro.kd, kd) : kd
          })
        });
      }

      case stats.ActionTypes[`STATS_${playerId}_SUCCESS`]: {
        const dtrStats = action.payload[0];
        const gggStats = action.payload[1];
        const currentWeek = dtrStats['currentWeek'];
        const year1 = dtrStats['year1'];
        const year2 = dtrStats['year2'];
        const year3 = dtrStats['year3'];

        const intro = Object.assign({}, state.intro, {
          membershipId: dtrStats['membershipId'],
          membershipType: dtrStats['membershipType'],
          matches: dtrStats['recentMatches'],
          streak: dtrStats['streak'],
          kd: {
            week: currentWeek.kills / Math.max(1, currentWeek.deaths),
            year1: year1.kills / Math.max(1, year1.deaths),
            year2: year2.kills / Math.max(1, year2.deaths),
            year3: year3.kills / Math.max(1, year3.deaths),
            bungie: state.intro && state.intro.kd ? state.intro.kd.bungie : null
          },
          flawless: {
            year1: year1.flawless,
            year2: year2.flawless,
            year3: year3.flawless,
          },
          elo: {
            rating: gggStats[dtrStats['membershipId']].elo,
            rank: gggStats[dtrStats['membershipId']].rank
          }
        });

        return Object.assign({}, state, {
          recentTeammates: dtrStats['recentTeammates'],
          header: Object.assign({}, state.header, {
            name: dtrStats['displayName'] ? dtrStats['displayName'] : state.displayName,
            badges: dtrStats['badges'],
          }),
          intro: intro,
          summarized: {
            week: dtrStats['currentWeek'],
            map: dtrStats['currentMap']
          }
        });
      }

      case player.ActionTypes[`INVENTORY_${playerId}_SUCCESS`]: {
        const items = action.payload['inventory']
          .filter(item => EQUIPPED_BUCKETS.indexOf(item.bucketHash) > -1)
          .map(item => {
            return {
              bucketHash: item.bucketHash,
              itemHash: item.items[0].itemHash,
              talentGridHash: item.items[0].talentGridHash,
              primaryStat: item.items[0].primaryStat ? item.items[0].primaryStat.value : null,
              nodes: item.items[0].nodes ? item.items[0].nodes.filter(node => (node.isActivated && !node.hidden)) : null
            }
          });

        const subclass = items.filter(item => item.bucketHash == 3284755031);
        const armor = items.filter(item => ARMOR_BUCKETS.indexOf(item.bucketHash) > -1);
        let exotic: Item[] = armor.filter(item => EXOTIC_ARMOR.indexOf(item.itemHash) > -1);
        return Object.assign({}, state, {
          header: Object.assign({}, state.header, {
            subclass: subclass[0]
          }),
          equipped: {
            weapons: [...items.filter(item => WEAPON_BUCKETS.indexOf(item.bucketHash) > -1)],
            armor: exotic.length > 0 ? [...exotic] : [...armor.filter(item => item.bucketHash === 3448274439)],
            artifact: [...items.filter(item => ARTIFACT_BUCKET === item.bucketHash)],
            subclass: [...subclass],
            classStats: state.classStats,
          }
        });
      }

      default: {
        return state;
      }
    }
  }
}

export const getName = (state: State) => state.header ? state.header.name : null;

export const getHeader = (state: State) => state.header;

export const getSummarized = (state: State) => state.summarized;

export const getEquipped = (state: State) => state.equipped;

export const getIntro = (state: State) => state.intro;

export const getLastMatches = (state: State) => state.intro && state.intro.matches ? state.intro.matches.slice(0, 3) : null;
