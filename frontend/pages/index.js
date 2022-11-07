import React from "react";
import Head from "next/head";
import {
  Book,
  Button,
  EmptyState,
  Flex,
  Layout,
  Section,
  Text,
} from "../components";
import { fontWeight, spacing } from "../theme";
import { useGetBooks } from "../api/books";

const Home = () => {
  const { books, booksLoading } = useGetBooks();
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
      <Layout>
        <Section>
          <Flex
            justifyContent="space-between"
            alignItems="center"
            p={`0 0 ${spacing["2.5"]} 0`}
            width="100%"
          >
            <Text fontWeight={fontWeight.bold}>My Library</Text>
            <Button>+ Add Book</Button>
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
