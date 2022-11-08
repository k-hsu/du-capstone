import { ApolloServer } from '@apollo/server';
import { merge } from 'lodash';
import { gql } from 'apollo-server-express';
import { resolvers, typeDefs } from '../../src/schema';
import { Author, Book, Category } from '../../models/index';

const seedingTypeDefs = gql`
  input AuthorData {
    id: ID!
    firstName: String
    lastName: String
    books: [ID!]!
  }

  input BookData {
    id: ID!
    title: String!
    author: ID!
    coverImage: String
    categories: [ID!]!
    description: String
  }

  input CategoryData {
    id: ID!
    name: String!
    books: [ID!]!
  }

  extend type Mutation {
    seedAuthors(data: [AuthorData]): Boolean
    seedBooks(data: [BookData]): Boolean
    seedCategories(data: [CategoryData]): Boolean

    deleteAuthors: Boolean
    deleteBooks: Boolean
    deleteCategories: Boolean
  }
`;

const seedingResolvers = {
  Mutation: {
    seedAuthors: (_parent, { data }) => Author.seed(data),
    seedBooks: (_parent, { data }) => Book.seed(data),
    seedCategories: (_parent, { data }) => Category.seed(data),
    deleteAuthors: () => Author.clear(),
    deleteBooks: () => Book.clear(),
    deleteCategories: () => Category.clear()
  }
};

export const getTestServer = () => {
  return new ApolloServer({
    typeDefs: [typeDefs, seedingTypeDefs],
    resolvers: merge(resolvers, seedingResolvers)
  });
};
