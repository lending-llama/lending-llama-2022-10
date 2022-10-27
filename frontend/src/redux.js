import {combineReducers, createStore} from 'redux'
import {errorsReducer} from "./domain/errors/reducers";
import {featuresReducer} from "./domain/features/reducers";
import {allocationsReducer} from "./domain/allocations/reducers";

export const store = createStore(
  combineReducers({
    allocations: allocationsReducer,
    features: featuresReducer,
    errors: errorsReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
