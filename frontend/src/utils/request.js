import {errorsAdded} from "../redux/actions/errors";
import 'whatwg-fetch' // sets global.fetch

export function fetchJson(url, dispatch) {
  return fetch(url)
    .then(async x => {
      if (x.status >= 400) {
        throw new Error(await x.text())
      }
      return x
    })
    .then(x => x.json())
    .catch(e => dispatch(errorsAdded(e.message)));
}
