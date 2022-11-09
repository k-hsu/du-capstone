import React from "react";
import { useForm } from "react-hook-form";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Modal from "../Modal/Modal";
import TextArea from "../TextArea/TextArea";

const AddBookModal = ({ onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ shouldUnregister: true });

  const onSubmitForm = (results) => {
    onSubmit(results);
  };

  const { ref, ...titleRegister } = register("title", {
    required: "title is required",
  });

  return (
    <Modal
      title="Add New Book"
      submitText="Add Book"
      onClose={(e) => {
        if (!e.key || e.key === "Enter") {
          onClose();
        }
      }}
      onSubmit={(e) => {
        if (!e.key || e.key === "Enter") {
          handleSubmit(onSubmitForm)(e);
        }
      }}
    >
      <Form>
        <Input
          labelText="Title"
          errorMessage={errors.title?.message}
          ref={(innerRef) => {
            if (innerRef) {
              innerRef.focus();
            }
            return ref(innerRef);
          }}
          {...titleRegister}
        />
        <Input
          labelText="Author"
          errorMessage={errors.author?.message}
          {...register("author", {
            required: "author is required",
            validate: (value) =>
              value.split(" ").length === 2 ||
              "author must have a first name and last name",
          })}
        />
        <TextArea
          rows="6"
          labelText="Description"
          errorMessage={errors.description?.message}
          {...register("description")}
        />
      </Form>
    </Modal>
  );
};

export default AddBookModal;
