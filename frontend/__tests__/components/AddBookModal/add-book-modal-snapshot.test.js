import React from "react";
import { renderer } from "../../../test-utils";
import AddBookModal from "../../../components/AddBookModal/AddBookModal";

jest.mock("react-dom", () => {
  const originalModule = jest.requireActual("react-dom");

  return {
    ...originalModule,
    createPortal: (element) => element,
  };
});

describe("AddBookModal Snapshot", () => {
  const spy = jest.spyOn(document, "getElementById");
  spy.mockReturnValue(<div id="app-root" />);
  it("should render modal component styles", () => {
    const component = renderer.create(<AddBookModal />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
