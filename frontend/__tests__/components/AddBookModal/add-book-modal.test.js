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
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  it("should call onSubmit when the 'Add Book' button is clicked", async () => {
    const onSubmitMock = jest.fn();
    render(
      <div id="app-root">
        <AddBookModal onSubmit={onSubmitMock} onClose={onCloseMock} />
      </div>
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "Title" }),
      "Eye of the Tiger"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "Author" }),
      "Survivor (band)"
    );
    await userEvent.type(
      screen.getByRole("textbox", { name: "Description" }),
      "The #2 pop song of the year 1982"
    );
    await userEvent.click(screen.getByText("Add Book"));
    expect(onSubmitMock).toHaveBeenCalledWith({
      author: "Survivor (band)",
      description: "The #2 pop song of the year 1982",
      title: "Eye of the Tiger",
    });
  });
});
