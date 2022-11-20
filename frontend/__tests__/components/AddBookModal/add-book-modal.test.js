import React from "react";
import { render, screen, userEvent, waitFor } from "../../../test-utils";
import Button from "../../../components/Button/Button";
import Text from "../../../components/Text/Text";
import Modal from "../../../components/Modal/Modal";
import AddBookModal from "../../../components/AddBookModal/AddBookModal";

jest.mock("../../../components/Modal/Modal");
describe("Add Book Modal", () => {
  let onCloseMock;
  let onSubmitMock;
  beforeEach(() => {
    onCloseMock = jest.fn();
    onSubmitMock = jest.fn();
    Modal.mockImplementation(
      ({
        title,
        children,
        onClose,
        onSubmit,
        cancelText = "Cancel",
        submitText = "Submit",
      }) => (
        <>
          <Text>{title}</Text>
          {children}
          <Button onClick={onClose}>{cancelText}</Button>
          <Button onClick={onSubmit}>{submitText}</Button>
        </>
      )
    );
    render(<AddBookModal onSubmit={onSubmitMock} onClose={onCloseMock} />);
  });
  it("should render add book modal component", () => {
    expect(screen.getByText("Add New Book")).toBeInTheDocument();
    expect(screen.getByText("Cancel")).toBeInTheDocument();
    expect(screen.getByText("Add Book")).toBeInTheDocument();
  });
  it("should call onClose when the cancel button is clicked", () => {
    const cancelButton = screen.getByText("Cancel");
    expect(cancelButton).toBeInTheDocument();
    userEvent.click(cancelButton);
    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
  it("should call onSubmit when the 'Add Book' button is clicked", async () => {
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
