import React from "react";
import ToastContext from "../../providers/contexts/ToastContext";

describe("Toast context", () => {
  it("should render toast context that is not null", () => {
    expect(<ToastContext />).not.toBeNull();
  });
});
