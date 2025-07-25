import mongoose from "mongoose";
let Schema = mongoose.Schema;
let String = Schema.Types.String;

export const ManufacturerSchema = new Schema(
  {
    name: String,
  },
  {
    collection: "manufacturers",
  }
);