const mockData = {
  categories: [
    { id: 1, name: "Tent" },
    { id: 2, name: "Shoes" },
    { id: 3, name: "Rope" },
    { id: 4, name: "Plier" },
  ],

  products: [
    { id: 1, name: "4 people tent" },
    { id: 2, name: "Black shoes " },
    { id: 3, name: "20m rope" },
    { id: 4, name: "Platinum plier" },
  ],
};

const db = {
  categories: {
    getAll: () => mockData.categories,
    findById: (id) => mockData.categories.find((item) => item.id == id),
    deleteById: (id) => {
      const item = mockData.categories.find((item) => item.id == id);
      if (item) {
        _.remove(mockData.categories, (item) => item.id == id);
        return id;
      }
      return null;
    },
    create: (input) => {
      const id = mockData.categories.length + 1;
      const item = {
        id: id,
        name: input.name,
      };
      mockData.categories.push(item);
      return item;
    },
    updateById: (id, input) => {
      const index = mockData.categories.findIndex((item) => item.id == id);
      if (index >= 0) {
        Object.keys(input).map((key) => {
          const value = input[key];
          mockData.categories[index][key] = value;
        });
        return mockData.categories[index];
      }
      return null;
    },
  },

  products: {
    getAll: () => mockData.products,
    findById: (id) => mockData.products.find((item) => item.id == id),
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
        id: id,
        name: input.name,
      };
      mockData.products.push(item);
      return item;
    },
    updateById: (id, input) => {
      const index = mockData.products.findIndex((item) => item.id == id);
      if (index >= 0) {
        Object.keys(input).map((key) => {
          const value = input[key];
          mockData.products[index][key] = value;
        });
        return mockData.products[index];
      }
      return null;
    },
  },
};

export { db };
