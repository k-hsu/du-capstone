import React, { useEffect } from "react";
import ToastProvider from "../../providers/ToastProvider/ToastProvider";
import ToastManager from "../../components/ToastManager/ToastManager";
import useToast from "../../hooks/useToast";
import { render, screen, waitForElementToBeRemoved } from "../../test-utils";

describe("Toast hook", () => {
  const TestComponent = ({ initialToasts }) => {
    const [_, addToast] = useToast();

    useEffect(() => {
      for (const toast of initialToasts) {
        addToast(toast);
      }
    }, []);

    const addToastAfterInterval = async (interval) => {
      await new Promise((r) => setTimeout(r, interval));
      addToast({ message: "Let's Toast Again" });
    };

    useEffect(() => {
      addToastAfterInterval(1000);
    }, []);

    return null;
  };
  it("should render toast", () => {
    render(
      <ToastProvider>
        <TestComponent
          initialToasts={[{ id: "first-toast", message: "Let's Toast" }]}
        />
        <ToastManager />
      </ToastProvider>
    );

    expect(screen.getByText("Let's Toast")).toBeInTheDocument();
  });

  it("should render new toast after 1 second", async () => {
    render(
      <ToastProvider>
        <TestComponent
          initialToasts={[
            { id: "first-toast", message: "Let's Toast", duration: 1000 },
          ]}
        />
        <ToastManager />
      </ToastProvider>
    );
    const toast = screen.getByText("Let's Toast");
    await waitForElementToBeRemoved(toast, { setTimeout: 3000 });
    expect(await screen.findByText("Let's Toast Again")).toBeInTheDocument();
  });

  it("should render multiple toasts", () => {
    render(
      <ToastProvider>
        <TestComponent
          initialToasts={[
            { id: "first-toast", message: "Let's Toast" },
            { id: "second-toast", message: "Toast!" },
          ]}
        />
        <ToastManager />
      </ToastProvider>
    );

    expect(screen.getByText("Let's Toast")).toBeInTheDocument();
    expect(screen.getByText("Toast!")).toBeInTheDocument();
  });
});
