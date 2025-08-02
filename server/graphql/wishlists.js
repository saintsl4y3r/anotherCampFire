// server/graphql/wishlist.js
import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLInputObjectType } from "graphql";
import repo from "../data/mongoRepo.js";
import { category } from "./products.js";

// Wishlist Type
const WishlistType = new GraphQLObjectType({
  name: "Wishlist",
  fields: () => ({
    id: { type: GraphQLID },
    userID: { type: GraphQLInt },
    productID: { type: GraphQLInt },
    createdAt: { type: GraphQLString },
    updatedAt: { type: GraphQLString },
    product: {
      type: category,
      resolve: async (wishlist) => {
        return await repo.products.findById(wishlist.productID);
      },
    }
  })
});

// Input for creating a wishlist
const WishlistInput = new GraphQLInputObjectType({
  name: "WishlistInput",
  fields: () => ({
    userID: { type: new GraphQLNonNull(GraphQLInt) },
    productID: { type: new GraphQLNonNull(GraphQLInt) },
  })
});

const wishlistQueries = {
  // Lấy tất cả wishlist theo userID
  getWishlistByUser: {
    type: new GraphQLList(WishlistType),
    args: { userID: { type: new GraphQLNonNull(GraphQLInt) } },
    resolve: async (_, { userID }) => {
      return await repo.wishlist.find({ userID });
    }
  },
};

const wishlistMutations = {
  // Thêm vào wishlist
  addToWishlist: {
    type: WishlistType,
    args: {
      input: { type: new GraphQLNonNull(WishlistInput) }
    },
    resolve: async (_, { input }) => {
      // Check tồn tại trước khi thêm
      const exists = await repo.wishlist.exists({ userID: input.userID, productID: input.productID });
      if (exists) {
        throw new Error("This product is already in your wishlist.");
      }
      return await repo.wishlist.create(input);
    }
  },

  // Xoá khỏi wishlist
  removeFromWishlist: {
    type: GraphQLString,
    args: {
      userID: { type: new GraphQLNonNull(GraphQLInt) },
      productID: { type: new GraphQLNonNull(GraphQLInt) }
    },
    resolve: async (_, { userID, productID }) => {
      const removed = await repo.wishlist.findOneAndDelete({ userID, productID });
      if (removed) {
        return "Removed from wishlist successfully.";
      } else {
        return "Item not found in wishlist.";
      }
    }
  }
};

export { WishlistType, wishlistQueries, wishlistMutations };
