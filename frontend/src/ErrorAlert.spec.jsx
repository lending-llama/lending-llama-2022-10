import {ErrorAlert} from "./ErrorAlert";
import {fireEvent, render, waitFor} from "@testing-library/react";
import React from "react";
import {Provider} from "react-redux";
import {store} from "./redux";
import '@testing-library/jest-dom'
import {errorsAdded, errorsDismissedFirst} from "./actions/errors"; // extends Jest with .toHaveTextContent
import {ErrorAlertPresentation} from "./ErrorAlert";

describe('Error Alert', () => {
  it('displays error msg', () => {
    const alert = render(<Provider store={store}><ErrorAlert/></Provider>);
    store.dispatch(errorsAdded('fdsa'))
    alert.getByText('fdsa')
  })
  it('dismisses error msg', async () => {
    const alert = render(<Provider store={store}><ErrorAlert/></Provider>);
    store.dispatch(errorsDismissedFirst())
    expect(alert.queryAllByText('fdsa')).toEqual([])
  })
})

describe("ErrorAlertPresentation", () => {
  it("renders a message", async () => {
    const ctx = render(<ErrorAlertPresentation msg={"this is a test"} onDismiss={() => {}} />)

    await waitFor(() =>
      ctx.getByText("this is a test")
    );
  });

  it("calls onDismiss when dismiss button is clicked", async () => {
    let wasClicked = false;
    const ctx = render(<ErrorAlertPresentation msg={"this is a test"} onDismiss={() => {
      wasClicked = true;
    }} />);
    const button = await ctx.findByText("Dismiss");

    fireEvent.click(button);

    await waitFor(() => expect(wasClicked).toBe(true));
  });
});
