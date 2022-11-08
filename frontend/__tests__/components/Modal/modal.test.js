import React from "react";
import { render, screen, userEvent } from "../../../test-utils";
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
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
  it("should call onClose when the close and cancel button is clicked", async () => {
    const onCloseMock = jest.fn();
    render(
      <div id="app-root">
        <Modal title="Notification" onClose={onCloseMock}>
          You have been notified of a friend request
        </Modal>
      </div>
    );
    const closeButton = screen.getByText("X");
    expect(closeButton).toBeInTheDocument();
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    await userEvent.click(closeButton);
    await userEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
  it("should call onSubmit when the close button is clicked", async () => {
    const onSubmitMock = jest.fn();
    render(
      <div id="app-root">
        <Modal title="Notification" onSubmit={onSubmitMock}>
          You have been notified of a friend request
        </Modal>
      </div>
    );
    const submitButton = screen.getByText("Submit");
    expect(submitButton).toBeInTheDocument();
    await userEvent.click(submitButton);
    expect(onSubmitMock).toBeCalled();
  });
});
