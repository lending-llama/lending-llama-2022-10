import {errorsReducer, getFirstError} from "./errors";
import {errorsAdded, errorsDismissedFirst} from "../actions/errors";
import * as r from 'ramda'

describe('Errors reducer', () => {


  it('removes error', () => {
    const state = r.pipe(
      () => errorsReducer(),
      x => errorsReducer(x, errorsAdded("foo")),
      x => errorsReducer(x, errorsAdded("bar")),
      x => errorsReducer(x, errorsDismissedFirst())
    )()

    expect(getFirstError(state))
      .toEqual("bar")
  })
  it('saves payloads', () => {
    const state = r.pipe(
      () => errorsReducer(),
      x => errorsReducer(x, errorsAdded("foo")),
      x => errorsReducer(x, errorsAdded("baz"))
    )()
    expect(state)
      .toEqual(['foo', 'baz'])
  })
})
