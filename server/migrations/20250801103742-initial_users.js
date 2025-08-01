// migrations/20250801103742-initial_users.js

export async function up(db, client) {
  const bcrypt = await import('bcrypt').then(m => m.default);

  // ❗ Xoá trước nếu trùng username
  await db.collection("users").deleteMany({
    username: { $in: ["admin", "john", "jack", "alice", "bob"] },
  });

  await db.collection("users").insertMany([
    {
      username: "admin",
      email: "admin@example.com",
      password: bcrypt.hashSync("1234", 10),
      role: "admin",
    },
    {
      username: "john",
      email: "john@example.com",
      password: bcrypt.hashSync("1234", 10),
      role: "manager",
    },
    {
      username: "jack",
      email: "jack@example.com",
      password: bcrypt.hashSync("1234", 10),
      role: "manager",
    },
    {
      username: "alice",
      email: "alice@example.com",
      password: bcrypt.hashSync("1234", 10),
      role: "customer",
    },
    {
      username: "bob",
      email: "bob@example.com",
      password: bcrypt.hashSync("1234", 10),
      role: "customer",
    },
  ]);
}

export async function down(db, client) {
  await db.collection("users").deleteMany({
    username: { $in: ["admin", "john", "jack", "alice", "bob"] },
  });
}
