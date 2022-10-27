import 'whatwg-fetch' // sets global.fetch

const FETCH_ERROR = 'fetch-error-4d1ce345'
class FetchEventTarget extends EventTarget {
  dispatchError(err) {
    this.dispatchEvent(new CustomEvent(FETCH_ERROR, {detail: err}))
  }
  onError(cb) {
    this.addEventListener(FETCH_ERROR, (e) => { cb(e.detail) }, false)
  }
}
export const fetchEventTarget = new FetchEventTarget()

export function fetchJson(url) {
  return fetch(url)
    .then(async x => {
      if (x.status >= 400) {
        throw new Error(await x.text())
      }
      return x
    })
    .then(x => x.json())
    .catch(e => {
      fetchEventTarget.dispatchError(e)
      throw e;
    });
}
