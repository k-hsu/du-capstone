import React from "react";
import { renderer } from "../../../test-utils";
import Modal from "../../../components/Modal/Modal";

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");

  return {
    ...originalModule,
    createPortal: (element) => element,
  };
});

describe("Modal Snapshot", () => {
  const spy = jest.spyOn(document, "getElementById");
  spy.mockReturnValue(<div id="app-root" />);
  it("should render modal component styles", () => {
    const component = renderer.create(
      <Modal title="Notification">
        You have been notified of a friend request
      </Modal>
    );
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
