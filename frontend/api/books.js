import { gql, useQuery, useMutation, makeVar } from "@apollo/client";
import { useGetAuthors, useAddAuthor } from "../api/authors";

export const GET_BOOKS_GQL = gql`
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

export const useGetBooks = () => {
  const { loading, error, data } = useQuery(GET_BOOKS_GQL);

  return {
    booksLoading: loading,
    booksError: error,
    books: data?.getBooks || [],
  };
};

export const GET_BOOK_GQL = gql`
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

export const useGetBook = (id) => {
  const { loading, error, data } = useQuery(GET_BOOK_GQL, {
    variables: { id },
  });

  return {
    bookLoading: loading,
    bookError: error,
    book: data?.getBook || {},
  };
};

export const ADD_BOOK_GQL = gql`
  mutation addBook(
    $title: String!
    $authorId: String!
    $coverImage: String
    $categoryIds: [String!]!
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

export const useAddBook = (
  title,
  authorId,
  coverImage,
  categoryIds,
  description
) => {
  const [add, { loading, error, data }] = useMutation(ADD_BOOK_GQL, {
    variables: { title, authorId, coverImage, categoryIds, description },
    refetchQueries: () => [{ query: GET_BOOKS_GQL }],
  });
  const getAddBookData = makeVar(data?.addBook);

  const { getAuthors, refetchAuthors } = useGetAuthors();
  const { addAuthor, getAddAuthorData } = useAddAuthor();

  const findAuthor = async (name) => {
    await refetchAuthors();
    return getAuthors()?.find(
      ({ firstName, lastName }) => `${firstName} ${lastName}` === name
    );
  };

  const createAuthor = async (firstName, lastName) => {
    await addAuthor(firstName, lastName);
    return getAddAuthorData();
  };

  return {
    addBook: async (
      title,
      authorName,
      coverImage,
      categoryIds,
      description
    ) => {
      let author = await findAuthor(authorName);
      if (!author) {
        author = await createAuthor(...authorName.split(" "));
      }

      const response = await add({
        variables: {
          title,
          authorId: author.id,
          coverImage,
          categoryIds,
          description,
        },
      });
      getAddBookData(response?.data?.addBook);
    },
    addBookLoading: loading,
    addBookError: error,
    getAddBookData,
  };
};

export const REMOVE_BOOK_GQL = gql`
  mutation removeBook($id: ID!) {
    removeBook(id: $id)
  }
`;

export const useRemoveBook = () => {
  const [removeBook, { loading, error, data }] = useMutation(REMOVE_BOOK_GQL);

  return {
    removeBook,
    removeBookLoading: loading,
    removeBookError: error,
    removeBookData: data,
  };
};
