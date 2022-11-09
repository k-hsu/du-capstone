import React from "react";
import { render, screen, userEvent } from "../../../test-utils";
import AddBookModal from "../../../components/AddBookModal/AddBookModal";

describe("Add Book Modal", () => {
  const onCloseMock = jest.fn();
  it("should render add book modal component", () => {
    render(
      <div id="app-root">
        <AddBookModal />
      </div>
    );
    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add Book")).toBeInTheDocument();
  });
  it("should call onClose when the cancel button is clicked", async () => {
    render(
      <div id="app-root">
        <AddBookModal onClose={onCloseMock} />
      </div>
    );
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    await userEvent.click(cancelButton);
    expect(onCloseMock).toBeCalled();
  });
  it("should call onSubmit when the cancel button is clicked", async () => {
    const onSubmitMock = jest.fn();
    render(
      <div id="app-root">
        <AddBookModal onSubmit={onSubmitMock} onClose={onCloseMock} />
      </div>
    );
    const submitButton = screen.getByText("Add Book");
    expect(submitButton).toBeInTheDocument();
    const titleInput = screen.getAllByRole("textbox")[0];
    await userEvent.type(titleInput, "Eye of the Tiger");
    const authorInput = screen.getAllByRole("textbox")[1];
    await userEvent.type(authorInput, "Survivor (band)");
    const descriptionInput = screen.getAllByRole("textbox")[2];
    await userEvent.type(descriptionInput, "The #2 pop song of the year 1982");
    await userEvent.click(submitButton);
    expect(onSubmitMock).toBeCalled();
    expect(onCloseMock).toBeCalled();
  });
});
