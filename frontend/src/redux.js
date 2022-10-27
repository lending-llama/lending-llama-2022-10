import {combineReducers, createStore} from 'redux'
import {errorsReducer} from "./error/errorsReducer";
import {allocationsReducer} from "./allocations/allocationsReducer";
import {featuresReducer} from "./features/features";

export const store = createStore(
  combineReducers({
    allocations: allocationsReducer,
    features: featuresReducer,
    errors: errorsReducer,
  }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
