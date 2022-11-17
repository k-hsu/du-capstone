import React from "react";
import { render, screen, setup } from "../../../test-utils";
import Modal from "../../../components/Modal/Modal";

describe("Modal", () => {
  it("should render modal component", () => {
    render(
      <div id="app-root">
        <Modal title="Notification">
          You have been notified of a friend request
        </Modal>
      </div>
    );
    expect(screen.getByText("Notification")).toBeInTheDocument();
    expect(
      screen.getByText("You have been notified of a friend request")
    ).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
  it("should call onClose when the close and cancel button is clicked", async () => {
    const onCloseMock = jest.fn();
    const { user } = setup(
      <div id="app-root">
        <Modal title="Notification" onClose={onCloseMock}>
          You have been notified of a friend request
        </Modal>
      </div>
    );
    await user.click(screen.getByText("X"));
    await user.click(screen.getByText("Cancel"));
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
  it("should call onSubmit when the close button is clicked", async () => {
    const onSubmitMock = jest.fn();
    const { user } = setup(
      <div id="app-root">
        <Modal title="Notification" onSubmit={onSubmitMock}>
          You have been notified of a friend request
        </Modal>
      </div>
    );
    await user.click(screen.getByText("Submit"));
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
