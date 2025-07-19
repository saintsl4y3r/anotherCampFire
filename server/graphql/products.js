export const typeDef = `
    type Product {
        id: Int!
        name: String! 
    }
    
    input ProductInput {
      name: String!
    }
    
    extend type Query {
        products: [Product]
        product(id: Int!): Product
    }
    
    extend type Mutation {
      deleteProduct(id: Int!): Int
      createProduct(input: ProductInput!): Product
      updateProduct(id: Int!, input: ProductInput!): Product
    }
`;

export const resolvers = {
  Query: {
    products: (parent, args, context, info) => {
      return context.db.categories.getAll();
    },
    product: (parent, args, context, info) => {
      return context.db.categories.findById(args.id);
    }
  },
  Mutation: {
    deleteProduct: (parent, args, context, info) => {
      return context.db.products.deleteById(args.id);
    },
    createProduct: (parent, args, context, info) => {
      return context.db.products.create(args.input);
    },
    updateProduct: (parent, args, context, info) => {
      return context.db.products.updateById(args.id, args.input);
    },
  },
};