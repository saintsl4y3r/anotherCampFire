// server/data/mongoRepo.js
import mongoose from "mongoose";
import { UserSchema } from "./models/user.js";
import { CategorySchema } from "./models/category.js";
import { ProductSchema } from "./models/product.js";
import { ManufacturerSchema } from "./models/manufacturer.js";
import { OrderSchema } from "./models/order.js";
import { DetailSchema } from "./models/detail.js";
import { ReviewSchema } from "./models/review.js";

const User         = mongoose.model("User", UserSchema);
const Category     = mongoose.model("Category", CategorySchema);
const Product      = mongoose.model("Product", ProductSchema);
const Manufacturer = mongoose.model("Manufacturer", ManufacturerSchema);
const Order        = mongoose.model("Order", OrderSchema);
const Detail       = mongoose.model("Detail", DetailSchema);
const Review       = mongoose.model("Review", ReviewSchema);

class MongoRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const doc = new this.model(data);
    return await doc.save();
  }

  async findById(id) {
    return await this.model.findById(id);
  }

  async getAll() {
    return await this.model.find();
  }

  async updateById(id, input) {
    return await this.model.findByIdAndUpdate(id, input, { new: true });
  }

  async deleteById(id) {
    const result = await this.model.deleteOne({ _id: id });
    return result.deletedCount;
  }

  async exists(conditions) {
    return (await this.model.countDocuments(conditions)) > 0;
  }
}

// 3. Instantiate one repository per model
const db = {
  users:         new MongoRepository(User),
  categories:    new MongoRepository(Category),
  products:      new MongoRepository(Product),
  manufacturers: new MongoRepository(Manufacturer),
  orders:        new MongoRepository(Order),
  details:       new MongoRepository(Detail),
  reviews:       new MongoRepository(Review),
};

export default db;
export { MongoRepository };
export { db };
