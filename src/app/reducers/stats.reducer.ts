/* tslint:disable: no-switch-case-fall-through */
import { BNGStats, DTRStats, GGGStats, StatValue, Flawless } from "../models/stats.model";
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

const bngInitial: BNGStats = {
  activitiesWon: bngValuesInitial,
  activitiesEntered: bngValuesInitial,
  killsDeathsRatio: bngValuesInitial
};

const trialsInitial: DTRStats = {
  membershipId: '',
  flawless: {
    years: {
      1: trialsFlawlessInitial,
      2: trialsFlawlessInitial,
      3: trialsFlawlessInitial
    }
  }
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
      const bngStats: BNGStats = {
        activitiesWon: action.payload[0].activitiesWon,
        activitiesEntered: action.payload[0].activitiesEntered,
        killsDeathsRatio: action.payload[0].killsDeathsRatio
      };
      const playerId: string = action.payload[1];

      const updated: State = Object.assign({}, state[playerId], {
        bungie: bngStats,
        trials: state[playerId].trials,
        guardian: state[playerId].guardian
      });

      return Object.assign({}, state, {
        player1: playerId == 'player1' ? updated : state.player1,
        player2: playerId == 'player2' ? updated : state.player2,
        player3: playerId == 'player3' ? updated : state.player3
      });
    }

    case stats.ActionTypes.DTR_STATS: {
      const dtrStats: DTRStats = {
        membershipId: action.payload[0].membershipId,
        flawless: action.payload[0].flawless
      };
      const playerId: string = action.payload[1];

      const updated: State = Object.assign({}, state[playerId], {
        bungie: state[playerId].bungie,
        trials: dtrStats,
        guardian: state[playerId].guardian
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
        bungie: state[playerId].bungie,
        trials: state[playerId].trials,
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
