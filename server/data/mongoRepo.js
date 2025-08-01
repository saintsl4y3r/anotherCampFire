import mongoose from "mongoose";
import { UserSchema } from "./models/users.js";
import { CategorySchema } from "./models/category.js";

// Models
const User = mongoose.model("User", UserSchema);
const Category = mongoose.model("Category", CategorySchema);

// Generic MongoRepository
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

const db = new MongoRepository(User);

export default MongoRepository;
export { db };
