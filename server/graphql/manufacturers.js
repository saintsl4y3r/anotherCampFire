export const typeDef = `
  type Manufacturer {
    manuID: Int!
    manuName: String!
    products: [Product!]!
  }

  input ManufacturerInput {
    manuName: String!
  }

  extend type Query {
    manufacturers: [Manufacturer!]!
    manufacturer(manuID: Int!): Manufacturer
  }

  extend type Mutation {
    deleteManufacturer(manuID: Int!): Int
    createManufacturer(input: ManufacturerInput!): Manufacturer!
    updateManufacturer(manuID: Int!, input: ManufacturerInput!): Manufacturer!
  }
`;

export const resolvers = {
  Query: {
    manufacturers: (_, __, { db }) =>
      db.manufacturers.getAll(),
    manufacturer: (_, { manuID }, { db }) =>
      db.manufacturers.findById(manuID),
  },
  Mutation: {
    deleteManufacturer: (_, { manuID }, { db }) =>
      db.manufacturers.deleteById(manuID),
    createManufacturer: (_, { input }, { db }) =>
      db.manufacturers.create(input),
    updateManufacturer: (_, { manuID, input }, { db }) =>
      db.manufacturers.updateById(manuID, input),
  },
  Manufacturer: {
    products: (parent, _, { db }) =>
      db.products.getByManufacturerId(parent.manuID),
  },
};
