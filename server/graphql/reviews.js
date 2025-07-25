export const typeDef = `
  type Review {
    reviewID: Int!
    customerID: Int!
    productID: Int!
    rating: Int!
    comment: String
    createdAt: String!
    customer: User!
    product: Product!
  }

  input ReviewInput {
    customerID: Int!
    productID: Int!
    rating: Int!
    comment: String
  }

  extend type Query {
    reviews: [Review!]!
    review(reviewID: Int!): Review
  }

  extend type Mutation {
    deleteReview(reviewID: Int!): Int
    createReview(input: ReviewInput!): Review!
    updateReview(reviewID: Int!, input: ReviewInput!): Review!
  }
`;

export const resolvers = {
  Query: {
    reviews:      (_, __, { db }) => db.reviews.getAll(),
    review:       (_, { reviewID }, { db }) => db.reviews.findById(reviewID),
  },
  Mutation: {
    deleteReview: (_, { reviewID }, { db }) => db.reviews.deleteById(reviewID),
    createReview: (_, { input }, { db }) => {
      const data = { ...input, createdAt: new Date().toISOString() };
      return db.reviews.create(data);
    },
    updateReview: (_, { reviewID, input }, { db }) => db.reviews.updateById(reviewID, input),
  },
  Review: {
    customer:(parent, _, { db }) => db.users.findById(parent.customerID),
    product:(parent, _, { db }) => db.products.findById(parent.productID),
  },
};
