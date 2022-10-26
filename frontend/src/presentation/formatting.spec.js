import {formatRate} from "./formatting";

describe('Rate formatting', () => {
  it('always has two decimal places and a percent', () => {
    let rawRate = 7.1000
    let actual = formatRate(rawRate)
    expect(actual).toBe("7.10%");
  })
  it('returns an empty string if rate does not exist', () => {
    let actual = formatRate()
    expect(actual).toBe("");
  })
})
