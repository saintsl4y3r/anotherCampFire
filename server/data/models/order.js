import mongoose from "mongoose";
let Schema = mongoose.Schema;
let String = Schema.Types.String;

export const OrderSchema = new Schema(
  {
    name: String,
  },
  {
    collection: "orders",
  }
);