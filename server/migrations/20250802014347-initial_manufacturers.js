export async function up(db, client) {
  await db.collection("manufacturers").deleteMany({
    manuID: { $in: [1,2,3] }
  });

  await db.collection("manufacturers").insertMany([
    { manuID: 1, manuName: "CampCo" },
    { manuID: 2, manuName: "Outdoor Masters" },
    { manuID: 3, manuName: "ClimbTech" },
  ]);
}

export async function down(db, client) {
  await db.collection("manufacturers").deleteMany({
    manuID: { $in: [1,2,3] }
  });
}
