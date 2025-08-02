export async function up(db, client) {
  await db.collection("orders").deleteMany({
    orderID: { $in: [100,101] }
  });

  await db.collection("orders").insertMany([
    { orderID: 100, customerID: 1, orderDate: "2025-07-10", totalAmount: 20550 },
    { orderID: 101, customerID: 1, orderDate: "2025-07-15", totalAmount: 2500 },
  ]);
}

export async function down(db, client) {
  await db.collection("orders").deleteMany({
    orderID: { $in: [100,101] }
  });
}
