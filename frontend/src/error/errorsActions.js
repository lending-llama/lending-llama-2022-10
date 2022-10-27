import {ERRORS_ADDED, ERRORS_DISMISSED_FIRST} from "./errorsConstants";

export const errorsDismissedFirst = () => ({type: ERRORS_DISMISSED_FIRST})
export const errorsAdded = (msg) => ({type: ERRORS_ADDED, payload: msg})
