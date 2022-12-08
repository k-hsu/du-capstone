import {
  gql,
  useLazyQuery,
  useQuery,
  useMutation,
  makeVar,
} from "@apollo/client";

export const GET_AUTHORS_GQL = gql`
  query getAuthors {
    getAuthors {
      id
      firstName
      lastName
    }
  }
`;

export const useGetAuthors = () => {
  const [refetch, { loading, error, data }] = useLazyQuery(GET_AUTHORS_GQL, {
    fetchPolicy: "network-only",
  });
  const getAuthors = makeVar(data?.getAuthors || []);
  return {
    authorsLoading: loading,
    authorsError: error,
    getAuthors,
    refetchAuthors: async () => {
      const response = await refetch();
      getAuthors(response?.data?.getAuthors || []);
    },
  };
};

export const GET_AUTHOR_GQL = gql`
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

export const useGetAuthor = (id) => {
  const { loading, error, data } = useQuery(GET_AUTHOR_GQL, {
    variables: { id },
  });
  return {
    authorLoading: loading,
    authorError: error,
    author: data?.getAuthor || [],
  };
};

export const ADD_AUTHOR_GQL = gql`
  mutation addAuthor($firstName: String!, $lastName: String!) {
    addAuthor(firstName: $firstName, lastName: $lastName) {
      id
      firstName
      lastName
    }
  }
`;

export const useAddAuthor = (firstName, lastName) => {
  const [add, { loading, error, data }] = useMutation(ADD_AUTHOR_GQL, {
    variables: { firstName, lastName },
  });
  const getAddAuthorData = makeVar(data?.addAuthor);
  return {
    addAuthor: async (firstName, lastName) => {
      const response = await add({ variables: { firstName, lastName } });
      getAddAuthorData(response?.data?.addAuthor);
    },
    addAuthorLoading: loading,
    addAuthorError: error,
    getAddAuthorData,
  };
};
