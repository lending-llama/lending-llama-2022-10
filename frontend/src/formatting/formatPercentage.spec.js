import {formatPercentage} from "./formatPercentage";

it('displays error msg', () => {
  const formatted = formatPercentage(1.5)
  expect(formatted).toEqual("1.50%")
})
