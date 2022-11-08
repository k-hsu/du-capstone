class Book {
  static books = [];
  constructor(title, authorId, coverImage, categoryIds, description) {
    const book = {
      id: String(Book.books.length + 1),
      title,
      author: authorId,
      coverImage: coverImage,
      categories: categoryIds,
      description: description
    };
    Book.books.push(book);
    return book;
  }

  static seed(data) {
    Book.books = data;
  }

  static clear() {
    Author.authors = [];
  }

  static get(id) {
    return Book.books.find(book => book.id === id);
  }

  static getAll() {
    return Book.books;
  }

  static update(id, title, authorId, categoryIds) {
    const bookIndex = Book.books.findIndex(book => book.id === id);
    if (bookIndex === -1) throw new Error('This book does not exist.');
    const book = {
      id,
      title,
      author: authorId,
      categories: categoryIds
    };
    Book.books[bookIndex] = book;

    return book;
  }

  static remove(id) {
    const bookIndex = Book.books.findIndex(book => book.id === id);
    if (bookIndex === -1) throw new Error('This book does not exist.');
    const [book] = Book.books.splice(bookIndex, 1);
    return book.id;
  }
}

export default Book;
