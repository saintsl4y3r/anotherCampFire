import mongoose from "mongoose";
let Schema = mongoose.Schema;
let String = Schema.Types.String;

export const ReviewSchema = new Schema(
  {
    name: String,
  },
  {
    collection: "reviews",
  }
);