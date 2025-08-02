// graphql/schema.js
import { createSchema } from 'graphql-yoga';
import _ from 'lodash';

import { typeDef as categories, resolvers as categoriesResolvers } from './categories.js';
import { typeDef as products, resolvers as productsResolvers } from './products.js';
import { typeDef as reviews, resolvers as reviewsResolvers } from './reviews.js';
import { typeDef as users, resolvers as usersResolvers } from './users.js';
import { typeDef as orders, resolvers as ordersResolvers } from './orders.js';
import { typeDef as details, resolvers as detailsResolvers } from './details.js';
import { typeDef as manufacturers, resolvers as manufacturersResolvers } from './manufacturers.js';
import { typeDef as wishlistTypeDef, resolvers as wishlistResolvers } from './wishlists.js';

import {
  typeDef as login,
  resolvers as loginResolvers,
} from "./authentication.js";

const base = `
  type Query
  type Mutation
`;

const typeDefs = `
  ${base}
  ${categories}
  ${manufacturers}
  ${details}
  ${reviews}
  ${products}
  ${users}
  ${orders}
  ${login}
  ${wishlist}
`;

const resolvers = _.merge(
  categoriesResolvers,
  manufacturersResolvers,
  detailsResolvers,
  reviewsResolvers,
  productsResolvers,
  usersResolvers,
  ordersResolvers,
  loginResolvers,
  wishlistResolvers,
);

export const schema = createSchema({
  typeDefs,
  resolvers,
});
