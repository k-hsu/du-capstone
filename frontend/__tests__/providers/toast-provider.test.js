import React from "react";
import ToastProvider from "../../providers/ToastProvider/ToastProvider";
import { render, screen } from "../../test-utils";

describe("Toast provider", () => {
  it("should render a toast provider that is not null", () => {
    render(<ToastProvider>hi</ToastProvider>);
    expect(screen.getByText("hi")).toBeInTheDocument();
  });
});
