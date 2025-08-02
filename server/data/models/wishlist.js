// server/models/wishlist.js
import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema({
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

const Wishlist = mongoose.model("Wishlist", wishlistSchema);
export default Wishlist;
