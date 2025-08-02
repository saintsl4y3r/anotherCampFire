import _ from 'lodash';

const mockData = {
  categories: [
    { categoryID: 1, categoryName: "Tent" },
    { categoryID: 2, categoryName: "Shoes" },
    { categoryID: 3, categoryName: "Rope" },
    { categoryID: 4, categoryName: "Plier" },
  ],

  manufacturers: [
    { manuID: 1, manuName: "CampCo" },
    { manuID: 2, manuName: "Outdoor Masters" },
    { manuID: 3, manuName: "ClimbTech" },
  ],

  products: [
    { productID: 1, productName: "4-Person Tent", price: 120.0, categoryID: 1, manuID: 1 },
    { productID: 2, productName: "Hiking Shoes", price: 85.5, categoryID: 2, manuID: 2 },
    { productID: 3, productName: "20m Climbing Rope", price: 45.0, categoryID: 3, manuID: 3 },
    { productID: 4, productName: "Multi-Tool Plier", price: 25.0, categoryID: 4, manuID: 2 },
  ],

  users: [
    { userID: 1, userName: "Alice", email: "alice@example.com", phone: "0123456789", role: "CUSTOMER" },
    { userID: 2, userName: "Bob",   email: "bob@example.com",   phone: "0987654321", role: "ADMIN" },
  ],

  orders: [
    { orderID: 100, customerID: 1, orderDate: "2025-07-10", totalAmount: 205.5 },
    { orderID: 101, customerID: 1, orderDate: "2025-07-15", totalAmount: 25.0 },
  ],

  details: [
    { detailID: 1000, orderID: 100, productID: 1, quantity: 1, price: 120.0 },
    { detailID: 1001, orderID: 100, productID: 2, quantity: 1, price: 85.5 },
    { detailID: 1002, orderID: 101, productID: 4, quantity: 1, price: 25.0 },
  ],

  reviews: [
    { reviewID: 500, customerID: 1, productID: 1, rating: 5, comment: "Very spacious tent!", createdAt: "2025-07-11T08:30:00Z" },
    { reviewID: 501, customerID: 1, productID: 2, rating: 4, comment: "Comfortable but a bit tight.", createdAt: "2025-07-12T14:20:00Z" },
  ],

    wishlist: [
    { id: "w1", userID: 1, productID: 1 },
    { id: "w2", userID: 1, productID: 2 },
  ],
};

const db = {
  categories: {
    getAll: () => mockData.categories,
    findById: id => mockData.categories.find(c => c.categoryID === id),
    deleteById: id => {
      if (_.remove(mockData.categories, c => c.categoryID === id).length) return id;
      return null;
    },
    create: input => {
      const categoryID = mockData.categories.length + 1;
      const item = { categoryID, categoryName: input.categoryName };
      mockData.categories.push(item);
      return item;
    },
    updateById: (id, input) => {
      const idx = mockData.categories.findIndex(c => c.categoryID === id);
      if (idx < 0) return null;
      Object.assign(mockData.categories[idx], input);
      return mockData.categories[idx];
    },
  },

  manufacturers: {
    getAll: () => mockData.manufacturers,
    findById: id => mockData.manufacturers.find(m => m.manuID === id),
    deleteById: id => {
      if (_.remove(mockData.manufacturers, m => m.manuID === id).length) return id;
      return null;
    },
    create: input => {
      const manuID = mockData.manufacturers.length + 1;
      const item = { manuID, manuName: input.manuName };
      mockData.manufacturers.push(item);
      return item;
    },
    updateById: (id, input) => {
      const idx = mockData.manufacturers.findIndex(m => m.manuID === id);
      if (idx < 0) return null;
      Object.assign(mockData.manufacturers[idx], input);
      return mockData.manufacturers[idx];
    },
  },

  products: {
    getAll: () => mockData.products,
    findById: id => mockData.products.find(p => p.productID === id),
    deleteById: id => {
      if (_.remove(mockData.products, p => p.productID === id).length) return id;
      return null;
    },
    create: input => {
      const productID = mockData.products.length + 1;
      const item = { productID, ...input };
      mockData.products.push(item);
      return item;
    },
    updateById: (id, input) => {
      const idx = mockData.products.findIndex(p => p.productID === id);
      if (idx < 0) return null;
      Object.assign(mockData.products[idx], input);
      return mockData.products[idx];
    },
    getByCategoryId: categoryID =>
      mockData.products.filter(p => p.categoryID === categoryID),
    getByManufacturerId: manuID =>
      mockData.products.filter(p => p.manuID === manuID),
  },

  users: {
    getAll: () => mockData.users,
    findById: id => mockData.users.find(u => u.userID === id),
    deleteById: id => {
      if (_.remove(mockData.users, u => u.userID === id).length) return id;
      return null;
    },
    create: input => {
      const userID = mockData.users.length + 1;
      const item = { userID, ...input };
      mockData.users.push(item);
      return item;
    },
    updateById: (id, input) => {
      const idx = mockData.users.findIndex(u => u.userID === id);
      if (idx < 0) return null;
      Object.assign(mockData.users[idx], input);
      return mockData.users[idx];
    },
  },

  orders: {
    getAll: () => mockData.orders,
    findById: id => mockData.orders.find(o => o.orderID === id),
    deleteById: id => {
      if (_.remove(mockData.orders, o => o.orderID === id).length) return id;
      return null;
    },
    create: input => {
      const orderID = mockData.orders.length + 100;
      const item = { orderID, ...input };
      mockData.orders.push(item);
      return item;
    },
    updateById: (id, input) => {
      const idx = mockData.orders.findIndex(o => o.orderID === id);
      if (idx < 0) return null;
      Object.assign(mockData.orders[idx], input);
      return mockData.orders[idx];
    },
    getByUserId: customerID =>
      mockData.orders.filter(o => o.customerID === customerID),
  },

  details: {
    getAll: () => mockData.details,
    findById: id => mockData.details.find(d => d.detailID === id),
    deleteById: id => {
      if (_.remove(mockData.details, d => d.detailID === id).length) return id;
      return null;
    },
    create: input => {
      const detailID = mockData.details.length + 1000;
      const item = { detailID, ...input };
      mockData.details.push(item);
      return item;
    },
    updateById: (id, input) => {
      const idx = mockData.details.findIndex(d => d.detailID === id);
      if (idx < 0) return null;
      Object.assign(mockData.details[idx], input);
      return mockData.details[idx];
    },
    getByOrderId: orderID =>
      mockData.details.filter(d => d.orderID === orderID),
    getByProductId: productID =>
      mockData.details.filter(d => d.productID === productID),
  },

  reviews: {
    getAll: () => mockData.reviews,
    findById: id => mockData.reviews.find(r => r.reviewID === id),
    deleteById: id => {
      if (_.remove(mockData.reviews, r => r.reviewID === id).length) return id;
      return null;
    },
    create: input => {
      const reviewID = mockData.reviews.length + 500;
      const createdAt = new Date().toISOString();
      const item = { reviewID, createdAt, ...input };
      mockData.reviews.push(item);
      return item;
    },
    updateById: (id, input) => {
      const idx = mockData.reviews.findIndex(r => r.reviewID === id);
      if (idx < 0) return null;
      Object.assign(mockData.reviews[idx], input);
      return mockData.reviews[idx];
    },
    getByProductId: productID =>
      mockData.reviews.filter(r => r.productID === productID),
    getByUserId: userID =>
      mockData.reviews.filter(r => r.customerID === userID),
  },
    
  wishlist: {
    getAll: () => mockData.wishlist,
    getByUserId: (userID) => mockData.wishlist.filter(w => w.userID === userID),
    deleteById: (id) => {
      if (_.remove(mockData.wishlist, w => w.id === id).length) return id;
      return null;
    },
    create: (input) => {
      const id = `w${mockData.wishlist.length + 1}`;
      const item = { id, ...input };
      mockData.wishlist.push(item);
      return item;
    },
  },
};

export { db };
