import { Category } from "./models/index.js";
import { Product } from "./models/index.js";
import { Manufacturer } from "./models/index.js";
import { Detail } from "./models/index.js";
import { Order } from "./models/index.js";
import { Review } from "./models/index.js";
import { User } from "./models/index.js";

const db = {
  categories: {
    getAll: async () => {
      const items = await Category.find();
      return items;
    },
    create: async ({ name }) => {
      const created = await Category.create({
        name: name,
      });
      return created;
    },
  },
  products: {
    getAll: async () => {
      const items = await Product.find();
      return items;
    },
    create: async ({ name }) => {
      const created = await Product.create({
        name: name,
      });
      return created;
    },
  },
};

export { db };