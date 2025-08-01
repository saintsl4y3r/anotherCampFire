import { createServer } from "node:http";
import { createYoga } from "graphql-yoga";
import { schema } from "./graphql/schema.js";
import { useGraphQLMiddleware } from "@envelop/graphql-middleware";
import { permissions } from "./permissions.js";
import { db } from "./config.js";

import dotenv from "dotenv";
dotenv.config();

import { initDatabase } from "./data/init.js";
await initDatabase();

const signingKey = process.env.JWT_SECRET;

import jwt from "jsonwebtoken";

const yoga = createYoga({
  schema,
  graphqlEndpoint: "/",
  plugins: [useGraphQLMiddleware([permissions])],
  context: async ({ request }) => {
    const authorization = request.headers.get("authorization") ?? "";
    let user = null;
    let secret = "";

    // Parse Bearer token and decode
    if (authorization.startsWith("Bearer ")) {
      const token = authorization.substring(7);
      try {
        const decoded = jwt.verify(token, signingKey);
        user = decoded;
        secret = decoded.secret || "fallback_secret"; // dùng nếu token không có trường 'secret'
      } catch (err) {
        console.error("JWT decode error:", err.message);
      }
    }

    return {
      db,
      user,
      secret,
    };
  }
});

const server = createServer(yoga);

const PORT = 4000;
server.listen(PORT, () => {
  console.info(`🚀 Server is running at http://localhost:${PORT}`);
});
