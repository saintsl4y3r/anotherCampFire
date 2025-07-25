import mongoose from "mongoose";
let Schema = mongoose.Schema;
let String = Schema.Types.String;

export const DetailSchema = new Schema(
  {
    name: String,
  },
  {
    collection: "details",
  }
);