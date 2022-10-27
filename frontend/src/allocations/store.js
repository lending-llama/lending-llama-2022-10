const BEST_RATE_FETCHED_ACTION = 'allocations/best-rate-fetched';
const MULTIPLE_TIERS_FETCHED_ACTION = 'allocations/multiple-tiers-fetched';

export const bestRateFetched = (allocation) => ({type: BEST_RATE_FETCHED_ACTION, payload: allocation})
export const multipleTiersFetched = (allocations) => ({type: MULTIPLE_TIERS_FETCHED_ACTION, payload: allocations})

import * as r from "ramda"

export const allocationsReducer = (state = {bestRate: {}, multipleTiers: []}, action) => {
  switch (action.type) {
    case 'allocations/best-rate-fetched':
      return r.assoc('bestRate', action.payload)(state)
    case 'allocations/multiple-tiers-fetched':
      return r.assoc('multipleTiers', action.payload)(state)
    default:
      return state
  }
};
