import { GraphQLError } from "graphql";

const hasGoodSecret = async (next, parent, args, ctx) => {
  const secret = ctx?.secret || '';
  if (secret.length < 8) {
    throw new GraphQLError(`Not a good secret!`);
  }
  return next();
};

export const permissions = {
  Query: {
    salute: hasGoodSecret,
  },
};
