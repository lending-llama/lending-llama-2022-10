import nock from "nock";
import React from "react";
import {fetchEventTarget, fetchJson} from "./request";

describe('#fetchJson', () => {
  beforeEach(nock.cleanAll)

  it('catches http status errors', async () => {
    const anyURL = "/api/wurst";
    const lowestErrorBoundary = 400;
    const validJson = {};

    nock(/./)
      .get(anyURL)
      .reply(lowestErrorBoundary, validJson)

    let callbackCalled = false;
    const callback = () => callbackCalled = true;
    fetchEventTarget.onError(callback)

    try {
      await fetchJson(anyURL)
      return Promise.reject('expected to reject but did not')
    } catch (e) { /* ignore */ }

    expect(callbackCalled).toBe(true)
  })
})
