import {FETCH_ERROR} from "../http/request";
import {errorsAdded} from "./store";
import {store} from "../redux";

window.addEventListener(
  FETCH_ERROR,
  (e) => { store.dispatch(errorsAdded(e.detail)) },
  false
);
