import {fetchEventTarget} from "../http/request";
import {errorsAdded} from "./store";
import {store} from "../redux";

fetchEventTarget.onError(
  (err) => { store.dispatch(errorsAdded(err.message)) },
);
