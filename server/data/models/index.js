import mongoose from "mongoose";

import { CategorySchema } from "./category.js";
import { ProductSchema } from "./product.js";
import { ManufacturerSchema } from "./manufacturer.js";
import { DetailSchema } from "./detail.js";
import { OrderSchema } from "./order.js";
import { UserSchema } from "./user.js";
import { ReviewSchema } from "./review.js";

export const Category = mongoose.model("Category", CategorySchema);
export const Product = mongoose.model("Product", ProductSchema);
export const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);
export const Detail = mongoose.model("Detail", DetailSchema);
export const Order = mongoose.model("Order", OrderSchema);
export const User = mongoose.model("User", UserSchema);
export const Review = mongoose.model("Review", ReviewSchema);
