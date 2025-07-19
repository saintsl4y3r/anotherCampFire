import { createSchema } from "graphql-yoga";
import _ from "lodash";

import { typeDef as categories, resolvers as categoriesResolvers } from "./categories.js";
import { typeDef as products, resolvers as productsResolvers } from "./categories.js";

const query = `
  type Query {
    _empty: String
  }

  type Mutation {
    _emptyAction: String
  }
`;
const typeDefs = [query, categories, products];
const resolvers = _.merge(categoriesResolvers, productsResolvers);

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});