import React, { useState } from "react";
import Head from "next/head";
import {
  AddBookModal,
  Book,
  Button,
  EmptyState,
  Flex,
  Layout,
  Section,
  Text,
} from "../components";
import useToast from "../hooks/useToast";
import { fontWeight, spacing } from "../theme";
import { useGetBooks, useAddBookByAuthorName } from "../api/books";

const Home = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const { books, booksLoading, booksError } = useGetBooks();
  const { addBook } = useAddBookByAuthorName();
  const [_, addToast] = useToast();
  const onAddBookModalToggle = () => {
    setShowAddBookModal(!showAddBookModal);
  };
  const onAddBookModalSubmit = async ({ title, author, description }) => {
    onAddBookModalToggle();
    try {
      const [firstName, lastName] = author.split(" ");
      await addBook(title, firstName, lastName, null, [], description);
      addToast({
        type: "success",
        message: `${title} was added to the library`,
      });
    } catch (error) {
      addToast({ message: "Something went wrong" });
    }
  };

  return (
    <>
      <Head>
        <title>DU Capstone</title>
        <meta
          name="description"
          content="Capstone project for Digital University Dev Team"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showAddBookModal && (
        <AddBookModal
          onClose={onAddBookModalToggle}
          onSubmit={onAddBookModalSubmit}
        />
      )}
      <Layout>
        <Section>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            p={`0 0 ${spacing["2.5"]} 0`}
            width="100%"
          >
            <Text as="h3">My Library</Text>
            <Button onClick={onAddBookModalToggle}>
              <Text fontWeight={fontWeight.bold}>+ Add Book</Text>
            </Button>
          </Flex>
          <Flex width="100%" flexWrap="wrap" gap={spacing["0.75"]}>
            {booksLoading || booksError || !books?.length ? (
              <EmptyState loading={booksLoading} error={booksError} />
            ) : (
              books?.map((book) => <Book key={book.id} {...book} />)
            )}
          </Flex>
        </Section>
      </Layout>
    </>
  );
};

export default Home;
