import { gql } from 'apollo-server-express';
import { Author, Book, Category } from './models/index';

export const typeDefs = gql`
  "An individual book, contains a title, author, and an array of category ids"
  type Book {
    id: ID!
    "The book's title"
    title: String!
    "The book's author (an ID)"
    author: Author!
    "The book's cover image"
    coverImage: String
    "The book's categories (array of IDs)"
    categories: [Category!]!
    "The book's description"
    description: String
  }

  "An individual author, contains a first name, last name, and an array of book ids."
  type Author {
    id: ID!
    "The author's first name"
    firstName: String
    "The author's last name"
    lastName: String
    "The author's books (array of IDs)"
    books: [Book!]!
  }

  "An individual category, contains a name and an array of book ids."
  type Category {
    id: ID!
    "The category's name"
    name: String!
    "The category's books (array of IDs)"
    books: [Book!]!
  }

  type Query {
    "Gets all of the stored books"
    getBooks: [Book!]!
    "Gets a book by its id"
    getBook(id: ID!): Book
    "Gets all of the stored authors"
    getAuthors: [Author!]!
    "Gets an author by its id"
    getAuthor(id: ID!): Author
    "Gets all of the stored categories"
    getCategories: [Category!]!
    "Gets a category by its id"
    getCategory(id: ID!): Category
  }

  type Mutation {
    "Creates a new book"
    addBook(
      title: String!
      authorId: ID!
      coverImage: String
      categoryIds: [ID!]!
      description: String
    ): Book
    "Creates a new book by author name"
    addBookByAuthorName(
      title: String!
      firstName: String!
      lastName: String!
      coverImage: String
      categoryIds: [ID!]!
      description: String
    ): Book
    "Updates a book"
    updateBook(
      id: ID!
      title: String!
      authorId: ID!
      categoryIds: [ID!]!
    ): Book
    "Removes a book by its id"
    removeBook(id: ID!): ID
    "Creates a new author"
    addAuthor(firstName: String!, lastName: String!): Author
    "Updates an author"
    updateAuthor(id: ID!, firstName: String!, lastName: String!): Author
    "Removes an author by its id"
    removeAuthor(id: ID!): ID
    "Creates a new category"
    addCategory(name: String!): Category
    "Updates a category"
    updateCategory(id: ID!, name: String!): Category
    "Removes a category by its id"
    removeCategory(id: ID!): ID
  }
`;

export const resolvers = {
  Book: {
    author: ({ author: authorId }) => Author.get(authorId),
    categories: ({ categories: categoryIds }) =>
      categoryIds.map(categoryId => Category.get(categoryId))
  },
  Author: {
    books: ({ books: bookIds }) => bookIds.map(bookId => Book.get(bookId))
  },
  Category: {
    books: ({ books: bookIds }) => bookIds.map(bookId => Book.get(bookId))
  },
  Query: {
    getBooks: () => Book.getAll(),
    getBook: (_parent, { id }) => Book.get(id),
    getAuthors: () => Author.getAll(),
    getAuthor: (_parent, { id }) => Author.get(id),
    getCategories: () => Category.getAll(),
    getCategory: (_parent, { id }) => Category.get(id)
  },
  Mutation: {
    addBook: (
      _parent,
      { title, authorId, coverImage, categoryIds, description }
    ) => {
      return new Book(title, authorId, coverImage, categoryIds, description);
    },
    addAuthor: (_parent, { firstName, lastName }) => {
      return new Author(firstName, lastName);
    },
    addBookByAuthorName: (
      _parent,
      { title, firstName, lastName, coverImage, categoryIds, description }
    ) => {
      let author = Author.find(firstName, lastName);
      if (!author) {
        author = new Author(firstName, lastName);
      }
      return new Book(title, author.id, coverImage, categoryIds, description);
    },
    addCategory: (_parent, { name }) => {
      return new Category(name);
    },
    updateBook: (_parent, { id, title, authorId, categoryIds }) => {
      return Book.update(id, title, authorId, categoryIds);
    },
    updateAuthor: (_parent, { id, firstName, lastName }) => {
      return Author.update(id, firstName, lastName);
    },
    updateCategory: (_parent, { id, name }) => {
      return Category.update(id, name);
    },
    removeBook: (_parent, { id }) => {
      return Book.remove(id);
    },
    removeAuthor: (_parent, { id }) => {
      return Author.remove(id);
    },
    removeCategory: (_parent, { id }) => {
      return Category.remove(id);
    }
  }
};
