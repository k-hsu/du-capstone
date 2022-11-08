import { gql, useQuery, useMutation } from "@apollo/client";

export const useGetAuthors = () => {
  const query = gql`
    query getAuthors {
      getAuthors {
        id
        firstName
        lastName
      }
    }
  `;
  const { loading, error, data } = useQuery(query);
  return {
    authorsLoading: loading,
    authorsError: error,
    authors: data?.getAuthors || [],
  };
};

export const useGetAuthor = (id) => {
  const query = gql`
    query getAuthor($id: ID!) {
      getAuthor(id: $id) {
        id
        firstName
        lastName
        books {
          id
          title
        }
      }
    }
  `;
  const { loading, error, data } = useQuery(query, {
    variables: { id },
  });
  return {
    authorLoading: loading,
    authorError: error,
    author: data?.getAuthor || [],
  };
};

export const useFindAuthorByName = (firstName, lastName) => {
  const query = gql`
    query findAuthorByName($firstName: String!, $lastName: String!) {
      findAuthorByName(firstName: $firstName, lastName: $lastName) {
        id
        firstName
        lastName
        books {
          id
          title
        }
      }
    }
  `;
  const { loading, error, data, refetch } = useQuery(query, {
    variables: { firstName, lastName },
  });
  const refetchAuthorByName = async (firstName, lastName) => {
    const {
      data: { findAuthorByName },
    } = await refetch({ firstName, lastName });
    return findAuthorByName;
  };
  return {
    authorByNameLoading: loading,
    authorByNameError: error,
    authorByName: data?.findAuthorByName || [],
    refetchAuthorByName,
  };
};

export const useAddAuthor = (firstName, lastName) => {
  const mutation = gql`
    mutation addAuthor($firstName: String!, $lastName: String!) {
      addAuthor(firstName: $firstName, lastName: $lastName) {
        id
        firstName
        lastName
      }
    }
  `;

  const [add, { loading, error, data }] = useMutation(mutation, {
    variables: { firstName, lastName },
  });

  return {
    addAuthor: (firstName, lastName) =>
      add({ variables: { firstName, lastName } }),
    addAuthorLoading: loading,
    addAuthorError: error,
    addAuthorData: data,
  };
};
