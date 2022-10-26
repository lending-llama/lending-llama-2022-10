import nock from 'nock'
import {render, waitFor} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./redux";
import 'whatwg-fetch' // sets global.fetch
import '@testing-library/jest-dom'
import {BestRate} from "./BestRate";
import {formatRate} from "./presentation/formatting";

function getBestRateSurroundingDivId() {
  return 'allocation-c020b901';
}

describe('BestRate', () => {
  beforeEach(nock.cleanAll)

  it('displays best rate in UI', async () => {
    const anyPlatformName = 'Random Platform Name';
    const anyRate = 1;

    nock(/./)
      .get('/api/best-rate')
      .reply(200, {name: anyPlatformName, rate: anyRate})

    const c = render(<Provider store={store}><BestRate/></Provider>);
    await waitFor(() => c.getByText(anyPlatformName, {exact: false}))

    expect(c.getByTestId(getBestRateSurroundingDivId())).toHaveTextContent(formatRate(anyRate))
  })
})
