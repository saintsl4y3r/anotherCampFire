export async function up(db, client) {
  await db.collection("products").deleteMany({
    productID: { $in: [1,2,3,4] }
  });

  await db.collection("products").insertMany([
    { productID: 1, productName: "4-Person Tent", price: 12000, categoryID: 1, manuID: 1 },
    { productID: 2, productName: "Hiking Shoes", price: 8550, categoryID: 2, manuID: 2 },
    { productID: 3, productName: "20m Climbing Rope", price: 4500, categoryID: 3, manuID: 3 },
    { productID: 4, productName: "Multi-Tool Plier", price: 2500, categoryID: 4, manuID: 2 },
  ]);
}

export async function down(db, client) {
  await db.collection("products").deleteMany({
    productID: { $in: [1,2,3,4] }
  });
}
