import React from "react";
import ReactDOM from "react-dom";
import { render, screen, userEvent } from "../../../test-utils";
import Modal from "../../../components/Modal/Modal";

describe("Modal", () => {
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });
  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });
  it("should render modal component", () => {
    render(
      <Modal title="Notification">
        You have been notified of a friend request
      </Modal>
    );
    expect(screen.getByText("Notification")).toBeInTheDocument();
    expect(
      screen.getByText("You have been notified of a friend request")
    ).toBeInTheDocument();
    expect(screen.getByText("X")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });
  it("should call onClose when the close and cancel button is clicked", () => {
    const onCloseMock = jest.fn();
    render(
      <Modal title="Notification" onClose={onCloseMock}>
        You have been notified of a friend request
      </Modal>
    );
    userEvent.click(screen.getByText("X"));
    userEvent.click(screen.getByText("Cancel"));
    expect(onCloseMock).toHaveBeenCalledTimes(2);
  });
  it("should call onSubmit when the close button is clicked", () => {
    const onSubmitMock = jest.fn();
    render(
      <Modal title="Notification" onSubmit={onSubmitMock}>
        You have been notified of a friend request
      </Modal>
    );
    userEvent.click(screen.getByText("Submit"));
    expect(onSubmitMock).toHaveBeenCalledTimes(1);
  });
});
