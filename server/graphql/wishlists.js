// server/graphql/wishlist.js
import { db } from '../../data/mongoRepo.js';

export const typeDef = `
  type Wishlist {
    _id: ID!
    userId: ID!
    productId: ID!
    addedAt: String!
  }

  type Query {
    getWishlist(userId: ID!): [Wishlist!]!
  }

  type Mutation {
    addToWishlist(userId: ID!, productId: ID!): Wishlist!
    removeFromWishlist(userId: ID!, productId: ID!): Boolean!
  }
`;

export const resolvers = {
  Query: {
    getWishlist: async (_, { userId }) => {
      const wishlist = await db.wishlist.find({ userId });
      return wishlist;
    },
  },
  Mutation: {
    addToWishlist: async (_, { userId, productId }) => {
      const existing = await db.wishlist.exists({ userId, productId });
      if (existing) throw new Error('Sản phẩm đã tồn tại trong wishlist!');
      const wishlistItem = await db.wishlist.create({ userId, productId, addedAt: new Date().toISOString() });
      return wishlistItem;
    },
    removeFromWishlist: async (_, { userId, productId }) => {
      const result = await db.wishlist.findOneAndDelete({ userId, productId });
      return !!result;
    },
  },
};