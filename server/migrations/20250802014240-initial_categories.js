export async function up(db, client) {
  // Xóa nếu đã có sẵn
  await db.collection("categories").deleteMany({
    categoryID: { $in: [1,2,3,4] }
  });

  await db.collection("categories").insertMany([
    { categoryID: 1, categoryName: "Tent" },
    { categoryID: 2, categoryName: "Shoes" },
    { categoryID: 3, categoryName: "Rope" },
    { categoryID: 4, categoryName: "Plier" },
  ]);
}

export async function down(db, client) {
  await db.collection("categories").deleteMany({
    categoryID: { $in: [1,2,3,4] }
  });
}
