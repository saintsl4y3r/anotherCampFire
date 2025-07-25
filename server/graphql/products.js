// graphql/products.js

export const typeDef = `
  type Product {
    productID: Int!
    productName: String!
    price: Float!
    categoryID: Int!
    manuID: Int!
    category: Category
    manufacturer: Manufacturer
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
    # Trả về số lượng bản ghi bị xóa
    deleteProduct(productID: Int!): Int
    createProduct(input: ProductInput!): Product!
    updateProduct(productID: Int!, input: ProductInput!): Product!
  }
`;

export const resolvers = {
  Query: {
    products: async (_, __, { db }) => {
      return db.products.getAll();
    },
    product: async (_, { productID }, { db }) => {
      return db.products.findById(productID);
    },
  },

  Mutation: {
    deleteProduct: async (_, { productID }, { db }) => {
      return db.products.deleteById(productID);
    },
    createProduct: async (_, { input }, { db }) => {
      return db.products.create(input);
    },
    updateProduct: async (_, { productID, input }, { db }) => {
      return db.products.updateById(productID, input);
    },
  },

  Product: {
    category: (parent, _, { db }) => {
      return db.categories.findById(parent.categoryID);
    },
    manufacturer: (parent, _, { db }) => {
      return db.manus.findById(parent.manuID);
    },
    details: (parent, _, { db }) => {
      return db.details.getByProductId(parent.productID);
    },
    reviews: (parent, _, { db }) => {
      return db.reviews.getByProductId(parent.productID);
    },
  },
};
