export const typeDef = `
  type Product {
    productID: Int!
    productName: String!
    price: Float!
    categoryID: Int!
    manuID: Int!
    category: Category
    manufacturer: Manu
    details: [Detail!]!
    reviews: [Review!]!
  }

  input ProductInput {
    productName: String!
    price: Float!
    categoryID: Int!
    manuID: Int!
  }

  extend type Query {
    products: [Product!]!
    product(productID: Int!): Product
  }

  extend type Mutation {
    deleteProduct(productID: Int!): Int      # trả về số bản ghi xóa được
    createProduct(input: ProductInput!): Product!
    updateProduct(productID: Int!, input: ProductInput!): Product!
  }
`;

export const resolvers = {
  Query: {
    products: (_, __, { db }) =>
      db.products.getAll(),                 
    product: (_, { productID }, { db }) =>
      db.products.findById(productID),
  },
  Mutation: {
    deleteProduct: async (_, { productID }, { db }) =>
      db.products.deleteById(productID),
    createProduct: (_, { input }, { db }) =>
      db.products.create(input),
    updateProduct: (_, { productID, input }, { db }) =>
      db.products.updateById(productID, input),
  },
  Product: {
    category: (parent, _, { db }) =>
      db.categories.findById(parent.categoryID),
    manufacturer: (parent, _, { db }) =>
      db.manus.findById(parent.manuID),
    details: (parent, _, { db }) =>
      db.details.getByProductId(parent.productID),
    reviews: (parent, _, { db }) =>
      db.reviews.getByProductId(parent.productID),
  },
};
