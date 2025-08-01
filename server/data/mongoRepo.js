import mongoose from "mongoose";
import User from "./models/users.js";

class MongoRepository {
  constructor(model) {
    this.model = model;
  }

  async create(data) {
    const doc = new this.model(data);
    return await doc.save();
  }

  async createMany(dataArray) {
    return await this.model.insertMany(dataArray);
  }

  async findById(id, options = {}) {
    const { populate, select, lean = false } = options;
    let query = this.model.findById(id);
    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    if (lean) query = query.lean();
    return await query.exec();
  }

  async findOne(conditions, options = {}) {
    const { populate, select, lean = false } = options;
    let query = this.model.findOne(conditions);
    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    if (lean) query = query.lean();
    return await query.exec();
  }

  async find(conditions = {}, options = {}) {
    const { populate, select, sort, limit, skip, lean = false } = options;
    let query = this.model.find(conditions);
    if (select) query = query.select(select);
    if (populate) query = query.populate(populate);
    if (sort) query = query.sort(sort);
    if (limit) query = query.limit(limit);
    if (skip) query = query.skip(skip);
    if (lean) query = query.lean();
    return await query.exec();
  }

  async updateById(id, update, options = {}) {
    const { new: returnNew = true, runValidators = true } = options;
    return await this.model.findByIdAndUpdate(id, update, {
      new: returnNew,
      runValidators,
    });
  }

  async deleteById(id) {
    return await this.model.findByIdAndDelete(id);
  }

  async count(conditions = {}) {
    return await this.model.countDocuments(conditions);
  }

  async exists(conditions) {
    return (await this.model.countDocuments(conditions)) > 0;
  }
}

const db = new MongoRepository(User);

export default MongoRepository;
export { db };
