import * as r from "ramda";

export const FEATURE_CHANGED = 'features/changed';

export const featureChanged = (name, value) => ({type: FEATURE_CHANGED, payload: {[name]: value}});

export const featuresReducer = (state = {}, action) => {
  switch (action.type) {
    case FEATURE_CHANGED:
      return r.mergeRight(state, action.payload)
    default:
      return state
  }
}
