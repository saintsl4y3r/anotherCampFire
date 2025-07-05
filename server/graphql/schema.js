import { createSchema } from "graphql-yoga";
import { GraphQLError } from "graphql";
import _ from "lodash";

const typeDefs = `
   type Query {
   	# ... Ghi chú này sẽ không xuất hiện trong tài liệu mô tả API
      """
      Lời chào cho biết server đang hoạt động
      """
      hello: String
      
      """
      Chào hỏi một người dùng cụ thể
      """
      salute (
        "Tên của người dùng"
        name: String!
      ): String 
   }
`;

const resolvers = {
  Query: {
    hello: (parent, args, context, info) => {
      if (!_.has(context, "secret")) {
        return new GraphQLError("A secret is required.");
      }

      return `Hello World! ${context.secret}`;    
    },
    salute: (parent, args, context, info) =>
      `Hello ${args.name} ${context.secret}`,
  },
};

export const schema = createSchema({
  typeDefs: typeDefs,
  resolvers: resolvers,
});