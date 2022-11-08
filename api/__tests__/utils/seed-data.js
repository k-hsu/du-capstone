import { books, authors, categories } from '../data/schema.data';

const seedBooksMutation = `
mutation seedBooks($data: [BookData]) {
  seedBooks(data: $data)
}
`;

const seedAuthorsMutation = `
  mutation seedAuthors($data: [AuthorData]) {
    seedAuthors(data: $data)
  }
`;

const seedCategoriesMutation = `
  mutation seedCategories($data: [CategoryData]) {
    seedCategories(data: $data)
  }
`;

export const seedData = async testServer => {
  return Promise.all([
    testServer.executeOperation({
      query: seedBooksMutation,
      variables: {
        data: books
      }
    }),
    testServer.executeOperation({
      query: seedAuthorsMutation,
      variables: {
        data: authors
      }
    }),
    testServer.executeOperation({
      query: seedCategoriesMutation,
      variables: {
        data: categories
      }
    })
  ]);
};
