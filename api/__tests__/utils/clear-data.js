const deleteBooksMutation = `
  mutation deleteBooks() {
    status
  }
`;

const deleteAuthorsMutation = `
  mutation deleteAuthors() {
    status
  }
`;

const deleteCategoriesMutation = `
  mutation deleteCategories() {
    status
  }
`;

export const clearData = async testServer => {
  return Promise.all([
    testServer.executeOperation({
      query: deleteBooksMutation,
      variables: {}
    }),
    testServer.executeOperation({
      query: deleteAuthorsMutation,
      variables: {}
    }),
    testServer.executeOperation({
      query: deleteCategoriesMutation,
      variables: {}
    })
  ]);
};
