import {combineReducers, createStore} from 'redux'
import {errorsReducer} from "./errors/store";
import {featuresReducer} from "./features/store";
import {allocationsReducer} from "./allocations/store";

export const store = createStore(
  combineReducers({
    allocations: allocationsReducer,
    features: featuresReducer,
    errors: errorsReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
