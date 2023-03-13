import React from "react";
import { render, screen, userEvent, waitFor } from "../../../test-utils";
import AddBookModal from "../../../components/AddBookModal/AddBookModal";

describe("Add Book Modal", () => {
  const onCloseMock = jest.fn();
  let onSubmitMock = jest.fn();
  it("should call onClose when the cancel button is clicked", () => {
    render(<div id="app-root" />);
    render(<AddBookModal onSubmit={onSubmitMock} onClose={onCloseMock} />);

    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    userEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  it("should call onSubmit when the 'Add Book' button is clicked", async () => {
    render(<div id="app-root" />);
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
