import { createSchema } from "graphql-yoga";
import _ from "lodash";

import { typeDef as categories, resolvers as categoriesResolvers } from "./categories.js";
import { typeDef as products, resolvers as productsResolvers } from "./products.js";
import { typeDef as reviews, resolvers as reviewsResolvers } from "./reviews.js";
import { typeDef as users, resolvers as usersResolvers } from "./users.js";
import { typeDef as orders, resolvers as ordersResolvers } from "./orders.js";
import { typeDef as details, resolvers as detailsResolvers } from "./details.js";
import { typeDef as manufacturers, resolvers as manufacturersResolvers } from "./manufacturers.js";

const query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _emptyAction: String
  }
`;
const typeDefs = [query, categories, products, reviews, users, orders, manufacturers, details];
const resolvers = _.merge(categoriesResolvers, productsResolvers, reviewsResolvers, usersResolvers, ordersResolvers, manufacturersResolvers, details);

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});