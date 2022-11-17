import React, { useRef } from "react";
import { render, screen, setup } from "../../../test-utils";
import Input from "../../../components/Input/Input";

describe("Input", () => {
  const RefComponent = (props) => {
    const ref = useRef();
    return <Input ref={ref} {...props} />;
  };
  it("should render input component and its associated label", () => {
    render(<RefComponent labelText="band" />);
    expect(screen.getByText("band")).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "band" })).toBeInTheDocument();
  });
  it("should show values as typed by user", async () => {
    const { user } = setup(<RefComponent labelText="band" />);

    await user.type(
      screen.getByRole("textbox", { name: "band" }),
      "Eye of the Tiger"
    );
    expect(screen.getByRole("textbox", { name: "band" })).toHaveValue(
      "Eye of the Tiger"
    );
  });
});
