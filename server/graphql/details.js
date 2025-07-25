export const typeDef = `
  type Detail {
    detailID: Int!
    orderID: Int!
    productID: Int!
    quantity: Int!
    price: Float!
    order: Order!
    product: Product!
  }

  input DetailInput {
    orderID: Int!
    productID: Int!
    quantity: Int!
    price: Float!
  }

  extend type Query {
    details: [Detail!]!
    detail(detailID: Int!): Detail
  }

  extend type Mutation {
    deleteDetail(detailID: Int!): Int
    createDetail(input: DetailInput!): Detail!
    updateDetail(detailID: Int!, input: DetailInput!): Detail!
  }
`;

export const resolvers = {
  Query: {
    details:(_, __, { db }) => db.details.getAll(),
    detail:(_, { detailID }, { db }) => db.details.findById(detailID),
  },
  Mutation: {
    deleteDetail: (_, { detailID }, { db }) => db.details.deleteById(detailID),
    createDetail: (_, { input }, { db }) => db.details.create(input),
    updateDetail: (_, { detailID, input }, { db }) => db.details.updateById(detailID, input),
  },
  Detail: {
    order:(parent, _, { db }) => db.orders.findById(parent.orderID),
    product:(parent, _, { db }) => db.products.findById(parent.productID),
  },
};
