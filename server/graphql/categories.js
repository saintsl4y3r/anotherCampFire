export const typeDef = `
  type Category {
    _id: ID!
    categoryName: String!
  }

  input CategoryInput {
    categoryName: String!
  }

  extend type Query {
    categories: [Category!]!
    category(id: ID!): Category
  }

  extend type Mutation {
    deleteCategory(id: ID!): Int
    createCategory(input: CategoryInput!): Category!
    updateCategory(id: ID!, input: CategoryInput!): Category!
  }
`;

export const resolvers = {
  Query: {
    categories: (_, __, { db }) => db.categories.getAll(),
    category: (_, { id }, { db }) => db.categories.findById(id),
  },
  Mutation: {
    deleteCategory: (_, { id }, { db }) => db.categories.deleteById(id),
    createCategory: (_, { input }, { db }) => db.categories.create(input),
    updateCategory: (_, { id, input }, { db }) => db.categories.updateById(id, input),
  },
};
