export const typeDef = `
  type Category {
    categoryID: Int!
    categoryName: String!
    products: [Product!]!
  }

  input CategoryInput {
    categoryName: String!
  }

  extend type Query {
    categories: [Category!]!
    category(categoryID: Int!): Category
  }

  extend type Mutation {
    deleteCategory(categoryID: Int!): Int    # trả về số bản ghi đã xóa
    createCategory(input: CategoryInput!): Category!
    updateCategory(categoryID: Int!, input: CategoryInput!): Category!
  }
`;

export const resolvers = {
  Query: {
    categories: (_, __, { db }) =>
      db.categories.getAll(),
    category: (_, { categoryID }, { db }) =>
      db.categories.findById(categoryID),
  },
  Mutation: {
    deleteCategory: (_, { categoryID }, { db }) =>
      db.categories.deleteById(categoryID),
    createCategory: (_, { input }, { db }) =>
      db.categories.create(input),
    updateCategory: (_, { categoryID, input }, { db }) =>
      db.categories.updateById(categoryID, input),
  },
  Category: {
    products: (parent, _, { db }) =>
      db.products.getByCategoryId(parent.categoryID),
  },
};
