class Category {
  static categories = [];
  constructor(name) {
    const category = {
      id: String(Category.categories.length + 1),
      name,
      books: []
    };
    Category.categories.push(category);
    return category;
  }

  static seed(data) {
    Category.categories = data;
  }

  static clear() {
    Author.authors = [];
  }

  static get(id) {
    return Category.categories.find(category => category.id === id);
  }

  static getAll() {
    return Category.categories;
  }

  static update(id, name) {
    const categoryIndex = Category.categories.findIndex(
      category => category.id === id
    );
    if (categoryIndex === -1) throw new Error('This category does not exist.');
    const category = {
      id,
      name
    };
    Category.categories[categoryIndex] = category;
    return category;
  }

  static remove(id) {
    const categoryIndex = Category.categories.findIndex(
      category => category.id === id
    );
    if (categoryIndex === -1) throw new Error('This category does not exist.');
    const [category] = Category.categories.splice(categoryIndex, 1);
    return category.id;
  }
}

export default Category;
