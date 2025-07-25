// ✅ Đây là schema GraphQL cho user
export const typeDef = `
  type User {
    id: ID!
    name: String
    email: String
  }

  type Query {
    users: [User]
    user(id: ID!): User
  }
`;

import { db } from "../data/mongoRepo.js";

export const resolvers = {
  Query: {
    users: async () => {
      return await db.find();
    },
    user: async (_, { id }) => {
      return await db.findById(id);
    },
  },
};
