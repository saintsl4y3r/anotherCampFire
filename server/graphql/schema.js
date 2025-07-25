import { createSchema } from 'graphql-yoga';
import _ from 'lodash';

import { typeDef as categories, resolvers as categoriesResolvers } from './categories.js';
import { typeDef as products, resolvers as productsResolvers } from './products.js';
import { typeDef as reviews, resolvers as reviewsResolvers } from './reviews.js';
import { typeDef as users, resolvers as usersResolvers } from './users.js';
import { typeDef as orders, resolvers as ordersResolvers } from './orders.js';
import { typeDef as details, resolvers as detailsResolvers } from './details.js';
import { typeDef as manufacturers, resolvers as manufacturersResolvers } from './manufacturers.js';

// ✅ Dòng gốc: định nghĩa bắt buộc nếu dùng extend
const base = `
  type Query {
    _empty: String
    salute(name: String!): String!  # ✅ Thêm field salute để tránh middleware lỗi
  }

  type Mutation {
    _emptyAction: String
  }
`;

// ✅ Gộp tất cả typeDef lại trong 1 string
const typeDefs = `
  ${base}
  ${categories}
  ${manufacturers}
  ${details}
  ${reviews}
  ${products}
  ${users}
  ${orders}
`;

// ✅ Gộp toàn bộ resolvers
const resolvers = _.merge(
  categoriesResolvers,
  manufacturersResolvers,
  detailsResolvers,
  reviewsResolvers,
  productsResolvers,
  usersResolvers,
  ordersResolvers,
  {
    Query: {
      salute: (_, { name }) => `Xin chào, ${name}! 👋`,
    },
  }
);

// ✅ Export schema cho GraphQL Yoga
export const schema = createSchema({
  typeDefs,
  resolvers,
});
