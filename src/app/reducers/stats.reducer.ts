/* tslint:disable: no-switch-case-fall-through */
import {BNGStats, DTRStats, GGGStats, StatValue, Flawless, SummarizedStats} from "../models/stats.model";
import * as stats from "../actions/stats.actions";

export interface State {
  player1: Stats;
  player2: Stats;
  player3: Stats;
}

export interface Stats {
  bungie: BNGStats;
  trials: DTRStats;
  guardian: GGGStats;
}

const trialsFlawlessInitial: Flawless = {
  count: 0
};

const bngValuesInitial: StatValue = {
  statId: "",
  basic: {
    value: 0,
    displayValue: "N/A"
  }
};

const bngInitial: any = {
  activitiesWon: bngValuesInitial,
  activitiesEntered: bngValuesInitial,
  killsDeathsRatio: bngValuesInitial
};


const SummarizedStatsInitial: SummarizedStats = {
  flawless: 0,
  matches: 0,
  losses: 0,
  kills: 0,
  deaths: 0,
  weapons: [
    {
      itemTypeName: "Sniper Rifle",
      sum_kills: 0,
      sum_headshots: 0,
      file_name: "sniper-rifle.svg"
    },
    {
      itemTypeName: "Sidearm",
      sum_kills: 0,
      sum_headshots: 0,
      file_name: "sidearm.svg"
    },
    {
      itemTypeName: "Auto Rifle",
      sum_kills: 0,
      sum_headshots: 0,
      file_name: "auto-rifle.svg"
    }
  ]
};

const trialsInitial: DTRStats = {
  membershipId: '',
  streak: 0,
  flawless: 0,
  year2: SummarizedStatsInitial,
  year3: SummarizedStatsInitial,
  currentWeek: SummarizedStatsInitial,
  currentMap: SummarizedStatsInitial
};

const guardianInitial: GGGStats = {
  elo: 0,
  rank: 0
};

const initialState: State = {
  player1: {
    bungie: bngInitial,
    trials: trialsInitial,
    guardian: guardianInitial,
  },
  player2: {
    bungie: bngInitial,
    trials: trialsInitial,
    guardian: guardianInitial,
  },
  player3: {
    bungie: bngInitial,
    trials: trialsInitial,
    guardian: guardianInitial,
  }
};

export function reducer(state = initialState, action: stats.Actions): State {
  switch (action.type) {

    case stats.ActionTypes.BNG_STATS: {
      const bngStats: BNGStats = action.payload[0];
      const playerId: string = action.payload[1];

      const updated: State = Object.assign({}, state[playerId], {
        bungie: bngStats
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? updated : state.player1,
        player2: playerId == 'player2' ? updated : state.player2,
        player3: playerId == 'player3' ? updated : state.player3
      });
    }

    case stats.ActionTypes.DTR_STATS: {
      const dtrStats: DTRStats = action.payload[0];
      const playerId: string = action.payload[1];

      const updated: State = Object.assign({}, state[playerId], {
        trials: dtrStats,
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? updated : state.player1,
        player2: playerId == 'player2' ? updated : state.player2,
        player3: playerId == 'player3' ? updated : state.player3
      });
    }

    case stats.ActionTypes.GGG_STATS: {
      const membershipId:string = action.payload[2];
      const gggStats: GGGStats = {
        elo: action.payload[0][membershipId].elo,
        rank: action.payload[0][membershipId].rank
      };
      const playerId: string = action.payload[1];

      const updated: State = Object.assign({}, state[playerId], {
        guardian: gggStats
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
