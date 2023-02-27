import React from "react";
import ReactDOM from "react-dom";
import { render, screen, userEvent, waitFor } from "../../../test-utils";
import AddBookModal from "../../../components/AddBookModal/AddBookModal";

describe("Add Book Modal", () => {
  const onCloseMock = jest.fn();
  let onSubmitMock = jest.fn();
  beforeAll(() => {
    ReactDOM.createPortal = jest.fn((element, node) => {
      return element;
    });
  });
  afterEach(() => {
    ReactDOM.createPortal.mockClear();
  });
  it("should call onClose when the cancel button is clicked", () => {
    render(<AddBookModal onSubmit={onSubmitMock} onClose={onCloseMock} />);

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    userEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  it("should call onSubmit when the 'Add Book' button is clicked", async () => {
    render(<AddBookModal onSubmit={onSubmitMock} onClose={onCloseMock} />);

    userEvent.type(
      screen.getByRole("textbox", { name: "Title" }),
      "Eye of the Tiger"
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "Author" }),
      "Survivor (band)"
    );
    userEvent.type(
      screen.getByRole("textbox", { name: "Description" }),
      "The #2 pop song of the year 1982"
    );

    userEvent.click(screen.getByText("Add Book"));

    await waitFor(() => expect(onSubmitMock).toHaveBeenCalledTimes(1), {
      timeout: 3000,
    });
    expect(onSubmitMock).toHaveBeenCalledWith({
      author: "Survivor (band)",
      description: "The #2 pop song of the year 1982",
      title: "Eye of the Tiger",
    });
  });
});
