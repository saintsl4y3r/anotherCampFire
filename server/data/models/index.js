import mongoose from "mongoose";

import { CategorySchema } from "./category.js";
import { ProductSchema } from "./product.js";   
import { ManufacturerSchema } from "./manufacturer.js";
import { DetailSchema } from "./detail.js";
import { OrderSchema } from "./order.js";
import { UserSchema } from "./user.js";
import { ReviewSchema } from "./review.js";

export const Category = mongoose.model("category", CategorySchema);
export const Product = mongoose.model("product", ProductSchema);
export const Manufacturer = mongoose.model("manufacturer", ManufacturerSchema);
export const Detail = mongoose.model("detail", DetailSchema);
export const Order = mongoose.model("order", OrderSchema);
export const User = mongoose.model("user", UserSchema);
export const Review = mongoose.model("review", ReviewSchema);