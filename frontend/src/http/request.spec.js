import nock from "nock";
import {BestRate} from "../best-rate/BestRate";
import React from "react";
import {fetchJson} from "./request";

describe('BestRate', () => {
  beforeEach(nock.cleanAll)

  it('catches http status errors', async () => {
    const anyURL = "/api/wurst";
    const lowestErrorBoundary = 400;
    const validJson = {};

    nock(/./)
      .get(anyURL)
      .reply(lowestErrorBoundary, validJson)

    let callbackCalled = false;
    const callback = () => {
      callbackCalled = true;
    }

    try {
      await fetchJson(anyURL, callback)
      return Promise.reject('expected to reject but did not')
    } catch (e) { /* ignore */ }

    expect(callbackCalled).toBe(true)
  })
})
