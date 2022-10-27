import 'whatwg-fetch' // sets global.fetch

export const FETCH_ERROR = 'fetch-error-4d1ce345'

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
      window.dispatchEvent(new CustomEvent(FETCH_ERROR, {detail: e.message}))
      throw e;
    });
}
