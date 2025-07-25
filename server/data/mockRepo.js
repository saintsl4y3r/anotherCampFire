import _ from 'lodash'; // Đảm bảo lodash được import nếu dùng _.remove

const mockData = {
  categories: [
    { categoryID: 1, categoryName: "Tent" },
    { categoryID: 2, categoryName: "Shoes" },
    { categoryID: 3, categoryName: "Rope" },
    { categoryID: 4, categoryName: "Plier" },
  ],

  products: [
    { id: 1, name: "4 people tent" },
    { id: 2, name: "Black shoes" },
    { id: 3, name: "20m rope" },
    { id: 4, name: "Platinum plier" },
  ],
};

const db = {
  categories: {
    getAll: () => mockData.categories,
    findById: (id) =>
      mockData.categories.find((item) => item.categoryID == id),

    deleteById: (id) => {
      const item = mockData.categories.find((item) => item.categoryID == id);
      if (item) {
        _.remove(mockData.categories, (item) => item.categoryID == id);
        return id;
      }
      return null;
    },

    create: (input) => {
      const categoryID = mockData.categories.length + 1;
      const item = {
        categoryID,
        categoryName: input.categoryName,
      };
      mockData.categories.push(item);
      return item;
    },

    updateById: (id, input) => {
      const index = mockData.categories.findIndex((item) => item.categoryID == id);
      if (index >= 0) {
        Object.keys(input).forEach((key) => {
          mockData.categories[index][key] = input[key];
        });
        return mockData.categories[index];
      }
      return null;
    },
  },

  products: {
    getAll: () => mockData.products,
    findById: (id) =>
      mockData.products.find((item) => item.id == id),

    deleteById: (id) => {
      const item = mockData.products.find((item) => item.id == id);
      if (item) {
        _.remove(mockData.products, (item) => item.id == id);
        return id;
      }
      return null;
    },

    create: (input) => {
      const id = mockData.products.length + 1;
      const item = {
        id,
        name: input.name,
      };
      mockData.products.push(item);
      return item;
    },

    updateById: (id, input) => {
      const index = mockData.products.findIndex((item) => item.id == id);
      if (index >= 0) {
        Object.keys(input).forEach((key) => {
          mockData.products[index][key] = input[key];
        });
        return mockData.products[index];
      }
      return null;
    },
  },
};

export { db };
