export const typeDef = `
  type Order {
    orderID: Int!
    customerID: Int!
    orderDate: String!
    totalAmount: Float!
    customer: User!
    details: [Detail!]!
  }

  input OrderInput {
    customerID: Int!
    orderDate: String!
    totalAmount: Float!
  }

  extend type Query {
    orders: [Order!]!
    order(orderID: Int!): Order
  }

  extend type Mutation {
    deleteOrder(orderID: Int!): Int
    createOrder(input: OrderInput!): Order!
    updateOrder(orderID: Int!, input: OrderInput!): Order!
  }
`;

export const resolvers = {
  Query: {
    orders:(_, __, { db }) => db.orders.getAll(),
    order:(_, { orderID }, { db }) => db.orders.findById(orderID),
  },
  Mutation: {
    deleteOrder:  (_, { orderID }, { db }) => db.orders.deleteById(orderID),
    createOrder:  (_, { input }, { db }) => db.orders.create(input),
    updateOrder:  (_, { orderID, input }, { db }) => db.orders.updateById(orderID, input),
  },
  Order: {
    customer:     (parent, _, { db }) => db.users.findById(parent.customerID),
    details:      (parent, _, { db }) => db.details.getByOrderId(parent.orderID),
  },
};
