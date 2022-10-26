import {formatRate} from "./formatting";

describe('Rate formatting', () => {
  it('returns an empty string if rate does not exist', () => {
    let actual = formatRate()
    expect(actual).toBe("");
  })
  it('returns rate rounded down to 2 decimals', () => {
    let rawRate = 1.111
    let actual = formatRate(rawRate)
    expect(actual).toBe("1.11%");
  })
  it('returns rate rounded up to 2 decimals', () => {
    let rawRate = 1.119
    let actual = formatRate(rawRate)
    expect(actual).toBe("1.12%");
  })
  it('returns rate not rounded with 2 decimals', () => {
    let rawRate = 1.1
    let actual = formatRate(rawRate)
    expect(actual).toBe("1.10%");
  })
})
