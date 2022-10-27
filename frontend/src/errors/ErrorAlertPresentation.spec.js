import {fireEvent, render, waitFor} from "@testing-library/react";
import {ErrorAlertPresentation} from "./ErrorAlertPresentation";
import React from "react";

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
