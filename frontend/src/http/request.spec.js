import nock from "nock";
import {BestRate} from "../bestRate/BestRate";
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

    await fetchJson(anyURL, callback)

    expect(callbackCalled).toBe(true)
  })
})
