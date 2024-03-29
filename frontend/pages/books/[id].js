import React from "react";
import { useRouter } from "next/router";
import {
  Breadcrumbs,
  EmptyState,
  Flex,
  Layout,
  Section,
  Text,
} from "../../components";
import { fontWeight } from "../../theme";
import { useGetBook } from "../../api/books";

const BooksDetailPage = () => {
  const router = useRouter();
  const { book, bookLoading, bookError } = useGetBook(router.query.id);
  return (
    <Layout>
      <Section>
        <EmptyState loading={bookLoading} error={bookError} empty={!book}>
          <Breadcrumbs
            path={[{ id: "index", page: "Books", href: "/" }]}
            currentPage={book.title}
          />
          <Flex direction="column">
            <Text as="h1">{book.title}</Text>
            <Text
              as="h3"
              fontWeight={fontWeight.normal}
            >{`${book.author?.firstName} ${book.author?.lastName}`}</Text>
            {book.description && (
              <Text as="h3" fontWeight={fontWeight.bold}>
                Description
              </Text>
            )}
            {book.description && <Text>{book.description}</Text>}
          </Flex>
        </EmptyState>
      </Section>
    </Layout>
  );
};

export default BooksDetailPage;
