import { User } from '../data/models/index.js';

export const typeDef = `
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    displayName: String
  }

  type Query {
    salute: String!
    searchUsers(searchTerm: String!): [User!]!
  }
`;

export const resolvers = {
  Query: {
    salute: () => "Hello from secured resolver!",
    searchUsers: async (_, { searchTerm }) => {
      return await User.find({
        username: { $regex: searchTerm, $options: "i" }
      });
    },
  },
};
