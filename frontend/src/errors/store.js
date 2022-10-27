export const ERRORS_ADDED = 'errors/added'
export const ERRORS_DISMISSED_FIRST = 'errors/dismissed-first'

export const errorsDismissedFirst = () => ({type: ERRORS_DISMISSED_FIRST})
export const errorsAdded = (msg) => ({type: ERRORS_ADDED, payload: msg})

export const errorsReducer = (state = [], action = {}) => {
  switch (action.type) {
    case ERRORS_ADDED:
      return [...state, action.payload]
    case ERRORS_DISMISSED_FIRST:
      return state.slice(1)
    default:
      return state
  }
};

export const getFirstError = (state) => state[0]
