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
import { fontWeight, spacing } from "../theme";
import { useGetBooks, useAddBook } from "../api/books";
import { useFindAuthorByName, useAddAuthor } from "../api/authors";

const Home = () => {
  const [showAddBookModal, setShowAddBookModal] = useState(false);
  const { books, booksLoading } = useGetBooks();
  const { refetchAuthorByName } = useFindAuthorByName();
  const { addAuthor } = useAddAuthor();
  const { addBook } = useAddBook();

  const onAddBookModalToggle = () => setShowAddBookModal(!showAddBookModal);
  const onAddBookModalSubmit = async ({ title, author, description }) => {
    let bookAuthor = await refetchAuthorByName(...author.split(" "));
    if (!bookAuthor) {
      bookAuthor = await addAuthor(...author.split(" "));
    }
    await addBook(title, bookAuthor.id, null, [], description);
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
            <Text fontWeight={fontWeight.bold}>My Library</Text>
            <Button onClick={onAddBookModalToggle}>+ Add Book</Button>
          </Flex>
          <Flex width="100%" flexWrap="wrap" gap={spacing["0.75"]}>
            {booksLoading ? (
              <EmptyState loading={booksLoading} />
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
