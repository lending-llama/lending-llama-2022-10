import nock from 'nock'
import {render, waitFor} from "@testing-library/react";
import React from "react";
import {App, BestRate} from "./App";
import {Provider} from "react-redux";
import {store} from "./redux";
import 'whatwg-fetch' // sets global.fetch
import '@testing-library/jest-dom' // extends Jest with .toHaveTextContent

function getBestRateSurroundingDivId() {
  return 'allocation-c020b901';
}

describe('BestRate', () => {
  beforeEach(nock.cleanAll)

  it('displays best rate in UI', async () => {
    const randomPlatformName = 'Random Platform Name';
    const randomRate = 1;

    nock(/./)
      .get('/api/best-rate')
      .reply(200, {name: randomPlatformName, rate: randomRate})

    const c = render(<Provider store={store}><BestRate/></Provider>);
    await waitFor(() => c.getByText(randomPlatformName, {exact: false}))

    expect(c.getByTestId(getBestRateSurroundingDivId())).toHaveTextContent('1.00%')
  })
})
