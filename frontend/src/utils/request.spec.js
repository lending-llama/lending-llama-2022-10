import nock from "nock";
import {render, waitFor} from "@testing-library/react";
import {Provider} from "react-redux";
import {store} from "../redux/redux";
import {BestRate} from "../components/container/BestRate";
import {formatRate} from "./formatting";
import React from "react";
import {errorsReducer, getFirstError} from "../redux/reducers/errors";
import {fetchJson} from "./request";

describe('BestRate', () => {
  beforeEach(nock.cleanAll)

  it('catches http status errors', async () => {
    const anyURL = "/api/wurst";
    const anyErrorCode = 400;

    nock(/./)
      .get(anyURL)
      .reply(anyErrorCode, {})

    let callbackCalled = false;

    const callback = () => {
      callbackCalled = true;
    }

    await fetchJson(anyURL, callback)

    expect(callbackCalled).toBe(true)
  })
})
