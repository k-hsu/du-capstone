import { gql, useLazyQuery, useQuery, useMutation } from "@apollo/client";

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
  const [refetch, { loading, error, data }] = useLazyQuery(query, {
    fetchPolicy: "network-only",
  });
  return {
    authorsLoading: loading,
    authorsError: error,
    authors: data?.getAuthors || [],
    refetchAuthors: async () => {
      const response = await refetch();
      return response?.data?.getAuthors;
    },
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
    addAuthor: async (firstName, lastName) => {
      const response = await add({ variables: { firstName, lastName } });
      return response?.data?.addAuthor;
    },
    addAuthorLoading: loading,
    addAuthorError: error,
    addAuthorData: data,
  };
};
