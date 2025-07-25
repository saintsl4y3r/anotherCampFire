// graphql/users.js
import User from '../data/models/users.js';


export const typeDef = `
  type User {
    _id: ID!
    username: String!
    email: String!
    role: String!
    displayName: String
    profile: Profile
    status: Status
    preferences: Preferences
    stats: Stats
  }

  type Profile {
    fullName: String
    phoneNumber: String
    gender: String
  }

  type Status {
    isActive: Boolean
    isDeleted: Boolean
  }

  type Preferences {
    language: String
    currency: String
  }

  type Stats {
    totalOrders: Int
    totalSpent: Float
  }

  type PaginationInfo {
    page: Int
    limit: Int
    total: Int
    pages: Int
  }

  type SearchUsersResult {
    users: [User!]!
    pagination: PaginationInfo!
  }

  input SearchOptionsInput {
    page: Int
    limit: Int
  }

  extend type Query {
    searchUsers(searchTerm: String!, options: SearchOptionsInput): SearchUsersResult!
  }
`;

export const resolvers = {
  Query: {
    searchUsers: async (_, { searchTerm, options }) => {
      return await User.searchUsers(searchTerm, options);
    },
  },
};
