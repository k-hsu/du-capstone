class Author {
  constructor(firstName, lastName) {
    const author = {
      id: String(Author.authors.length + 1),
      firstName,
      lastName
    };
    Author.authors.push(author);
    return author;
  }

  static seed(data) {
    Author.authors = data;
  }

  static clear() {
    Author.authors = [];
  }

  static get(id) {
    return Author.authors.find(author => author.id === id);
  }

  static getAll() {
    return Author.authors.sort((a, b) => a.lastName.localeCompare(b.lastName));
  }

  static update(id, firstName, lastName) {
    const authorIndex = Author.authors.findIndex(author => author.id === id);
    if (authorIndex === -1) throw new Error('This author does not exist.');
    const author = {
      id,
      firstName,
      lastName
    };
    Author.authors[authorIndex] = author;
    return author;
  }

  static remove(id) {
    const authorIndex = Author.authors.findIndex(author => author.id === id);
    if (authorIndex === -1) throw new Error('This author does not exist.');
    const [author] = Author.authors.splice(authorIndex, 1);
    return author.id;
  }

  static find(firstName, lastName) {
    return Author.authors.find(
      author => author.firstName === firstName && author.lastName === lastName
    );
  }
}

Author.authors = [];

export default Author;
