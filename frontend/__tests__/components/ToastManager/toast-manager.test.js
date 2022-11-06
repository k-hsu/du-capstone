import React from "react";
import { render, screen } from "../../../test-utils";
import ToastManager from "../../../components/ToastManager/ToastManager";
import useToast from "../../../hooks/useToast";

jest.mock("../../../hooks/useToast");

describe("Toast", () => {
  it("should render toast manager with error toast", () => {
    useToast.mockReturnValue([[{ id: "first-toast", message: "Let's Toast" }]]);
    render(<ToastManager />);
    expect(screen.getByText("Error!")).toBeInTheDocument();
    expect(screen.getByText("Let's Toast")).toBeInTheDocument();
  });

  it("should render toast manager with success toast", () => {
    useToast.mockReturnValue([
      [{ id: "first-toast", type: "success", message: "Let's Toast" }],
    ]);
    render(<ToastManager />);
    expect(screen.getByText("Success!")).toBeInTheDocument();
    expect(screen.getByText("Let's Toast")).toBeInTheDocument();
  });

  it("should render toast manager with multiple toasts", () => {
    useToast.mockReturnValue([
      [
        { id: "first-toast", message: "Let's Toast" },
        { id: "second-toast", message: "Toast!" },
      ],
    ]);
    render(<ToastManager />);
    expect(screen.getByText("Let's Toast")).toBeInTheDocument();
    expect(screen.getByText("Toast!")).toBeInTheDocument();
  });
});
