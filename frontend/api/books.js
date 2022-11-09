import { gql, useQuery, useMutation } from "@apollo/client";

export const useGetBooks = () => {
  const query = gql`
    query getBooks {
      getBooks {
        id
        title
        coverImage
        author {
          id
          firstName
          lastName
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query);

  return {
    booksLoading: loading,
    booksError: error,
    books: data?.getBooks || [],
  };
};

export const useGetBook = (id) => {
  const query = gql`
    query getBook($id: ID!) {
      getBook(id: $id) {
        id
        title
        coverImage
        author {
          id
          firstName
          lastName
        }
        description
      }
    }
  `;

  const { loading, error, data } = useQuery(query, { variables: { id } });

  return {
    bookLoading: loading,
    bookError: error,
    book: data?.getBook || {},
  };
};

export const useAddBook = (
  title,
  authorId,
  coverImage,
  categoryIds,
  description
) => {
  const mutation = gql`
    mutation addBook(
      $title: String!
      $authorId: ID!
      $coverImage: String
      $categoryIds: [ID!]!
      $description: String
    ) {
      addBook(
        title: $title
        authorId: $authorId
        coverImage: $coverImage
        categoryIds: $categoryIds
        description: $description
      ) {
        id
        title
        author {
          id
          firstName
          lastName
        }
        coverImage
        categories {
          id
          name
        }
        description
      }
    }
  `;
  const [add, { loading, error, data }] = useMutation(mutation, {
    variables: { title, authorId, coverImage, categoryIds, description },
  });
  return {
    addBook: (title, authorId, coverImage, categoryIds, description) =>
      add({
        variables: {
          title,
          authorId,
          coverImage,
          categoryIds,
          description,
        },
      }),
    addBookLoading: loading,
    addBookError: error,
    addBookData: data,
  };
};

export const useAddBookByAuthorName = (
  title,
  firstName,
  lastName,
  coverImage,
  categoryIds,
  description
) => {
  const mutation = gql`
    mutation addBookByAuthorName(
      $title: String!
      $firstName: String!
      $lastName: String!
      $coverImage: String
      $categoryIds: [ID!]!
      $description: String
    ) {
      addBookByAuthorName(
        title: $title
        firstName: $firstName
        lastName: $lastName
        coverImage: $coverImage
        categoryIds: $categoryIds
        description: $description
      ) {
        id
        title
        author {
          id
          firstName
          lastName
        }
        coverImage
        categories {
          id
          name
        }
        description
      }
    }
  `;
  const refetchQuery = gql`
    query getBooks {
      getBooks {
        id
        title
        coverImage
        author {
          id
          firstName
          lastName
        }
      }
    }
  `;
  const [add, { loading, error, data }] = useMutation(mutation, {
    variables: {
      title,
      firstName,
      lastName,
      coverImage,
      categoryIds,
      description,
    },
    refetchQueries: () => [{ query: refetchQuery }],
  });
  return {
    addBook: (
      title,
      firstName,
      lastName,
      coverImage,
      categoryIds,
      description
    ) =>
      add({
        variables: {
          title,
          firstName,
          lastName,
          coverImage,
          categoryIds,
          description,
        },
      }),
    addBookLoading: loading,
    addBookError: error,
    addBookData: data,
  };
};

export const useRemoveBook = () => {
  const mutation = gql`
    mutation removeBook($id: ID!) {
      removeBook(id: $id)
    }
  `;

  const [removeBook, { loading, error, data }] = useMutation(mutation);

  return {
    removeBook,
    removeBookLoading: loading,
    removeBookError: error,
    removeBookData: data,
  };
};
