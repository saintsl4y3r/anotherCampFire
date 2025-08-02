export async function up(db, client) {
  await db.collection("details").deleteMany({
    detailID: { $in: [1000,1001,1002] }
  });

  await db.collection("details").insertMany([
    { detailID: 1000, orderID: 100, productID: 1, quantity: 1, price: 12000 },
    { detailID: 1001, orderID: 100, productID: 2, quantity: 1, price: 8550 },
    { detailID: 1002, orderID: 101, productID: 4, quantity: 1, price: 2500 },
  ]);
}

export async function down(db, client) {
  await db.collection("details").deleteMany({
    detailID: { $in: [1000,1001,1002] }
  });
}
