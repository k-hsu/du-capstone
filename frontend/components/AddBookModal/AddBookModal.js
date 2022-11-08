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
    onClose();
  };

  return (
    <Modal
      title="Add New Book"
      submitText="Add Book"
      onClose={onClose}
      onSubmit={(e) => {
        handleSubmit(onSubmitForm)(e);
      }}
    >
      <Form>
        <Input
          labelText="Title"
          errorMessage={errors.title?.message}
          {...register("title", { required: "title is required" })}
        />
        <Input
          labelText="Author"
          errorMessage={errors.author?.message}
          {...register("author", { required: "author is required" })}
        />
        <TextArea
          labelText="Description"
          errorMessage={errors.description?.message}
          {...register("description")}
        />
      </Form>
    </Modal>
  );
};

export default AddBookModal;
