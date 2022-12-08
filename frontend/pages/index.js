import React, { useState } from "react";
import Head from "next/head";
import {
  AddBookModal,
  Book,
  Button,
  EmptyState,
  Flex,
  Grid,
  Layout,
  Section,
  Text,
} from "../components";
import useToast from "../hooks/useToast";
import { fontWeight, spacing } from "../theme";
import { useGetBooks, useAddBook } from "../api/books";

const Home = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const { books, booksLoading, booksError } = useGetBooks();
  const { addBook } = useAddBook();
  const [_, addToast] = useToast();
  const onAddBookModalToggle = () => {
    setShowAddBookModal(!showAddBookModal);
  };
  const onAddBookModalSubmit = async ({ title, author, description }) => {
    try {
      await addBook(title, author, null, [], description);
      onAddBookModalToggle();
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
          <Grid
            width="100%"
            gap={spacing["0.75"]}
            gridTemplateColumns="repeat(auto-fill, 276px)"
          >
            {booksLoading || booksError || !books?.length ? (
              <EmptyState loading={booksLoading} error={booksError} />
            ) : (
              books?.map((book) => <Book key={book.id} {...book} />)
            )}
          </Grid>
        </Section>
      </Layout>
    </>
  );
};

export default Home;
