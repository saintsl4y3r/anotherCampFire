// server/models/wishlist.js
import mongoose from "mongoose";

export const WishlistSchema = new mongoose.Schema({
  userID: {
    type: Number,
    required: true,
  },
  productID: {
    type: Number,
    required: true,
  },
}, {
  timestamps: true
});

