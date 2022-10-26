import {formatRate} from "./formatting";

describe('Format Rate', () => {
  it('formats rate with 2 decimals and percent', () => {
    expect(formatRate(1)).toEqual("1.00%")
    expect(formatRate(3.4)).toEqual("3.40%")
    expect(formatRate(3.411)).toEqual("3.41%")
    expect(formatRate(3.419)).toEqual("3.42%")
  })
})
