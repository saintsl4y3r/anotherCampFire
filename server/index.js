import { createServer } from 'http';
import { createYoga } from 'graphql-yoga';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { applyMiddleware } from 'graphql-middleware';
import mongoose from 'mongoose';
import cors from 'cors';
import express from 'express';

import { typeDef as usersTypeDef, resolvers as usersResolvers } from './graphql/users.js';
import { typeDef as productsTypeDef, resolvers as productsResolvers } from './graphql/products.js';
import { typeDef as ordersTypeDef, resolvers as ordersResolvers } from './graphql/orders.js';
import { typeDef as detailsTypeDef, resolvers as detailsResolvers } from './graphql/details.js';
import { typeDef as manufacturersTypeDef, resolvers as manufacturersResolvers } from './graphql/manufacturers.js';
import { typeDef as categoriesTypeDef, resolvers as categoriesResolvers } from './graphql/categories.js';
import { typeDef as reviewsTypeDef, resolvers as reviewsResolvers } from './graphql/reviews.js';

import { mergeResolvers } from '@graphql-tools/merge';
import { db } from './data/mockRepo.js'; // ✅ Đảm bảo mock db được import

// Tạo Express app
const app = express();
app.use(cors({ origin: '*', credentials: true }));

// MongoDB connection (optional nếu xài mock data)
const mongoURL = 'mongodb://127.0.0.1:27017/shop';
const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL);
    console.log(`✅ Database connected successfully at: ${mongoURL}`);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// Merge typeDefs & resolvers
const baseTypeDef = `
  type Query
  type Mutation
`;

const schema = makeExecutableSchema({
  typeDefs: [
    baseTypeDef,
    usersTypeDef,
    productsTypeDef,
    ordersTypeDef,
    detailsTypeDef,
    manufacturersTypeDef,
    categoriesTypeDef,
    reviewsTypeDef
  ],
  resolvers: mergeResolvers([
    usersResolvers,
    productsResolvers,
    ordersResolvers,
    detailsResolvers,
    manufacturersResolvers,
    categoriesResolvers,
    reviewsResolvers
  ]),
});

// Apply middleware (optional)
const schemaWithMiddleware = applyMiddleware(schema, {
  Query: {},
  Mutation: {},
});

// Tạo GraphQL Yoga server
const yoga = createYoga({
  schema: schemaWithMiddleware,

  context: async ({ request }) => {
    // Truyền db mock vào context
    return {
      db,
    };
  },

  graphiql: {
    defaultQuery: `# Welcome to GraphQL Yoga
query Example {
  categories {
    categoryID
    categoryName
  }
}
    `,
  },

  logging: {
    debug: (...args) => console.debug(...args),
    info: (...args) => console.info(...args),
    warn: (...args) => console.warn(...args),
    error: (...args) => console.error(...args),
  },

  maskedErrors: false,
  cors: false,
});

// Mount GraphQL endpoint
app.use('/graphql', yoga);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

// Root route
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>GraphQL Server</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #f0f0f0;
          }
          .container {
            text-align: center;
            background: white;
            padding: 2rem;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.1);
          }
          h1 { color: #333; }
          a {
            display: inline-block;
            margin-top: 1rem;
            padding: 0.5rem 1.5rem;
            background: #007bff;
            color: white;
            text-decoration: none;
            border-radius: 4px;
          }
          a:hover { background: #0056b3; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🚀 GraphQL Server is Running!</h1>
          <p>Your GraphQL API is ready</p>
          <a href="/graphql">Open GraphQL Playground</a>
        </div>
      </body>
    </html>
  `);
});

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
const PORT = process.env.PORT || 4000;

const startServer = async () => {
  try {
    await connectDB(); // Optional nếu xài mock thôi có thể bỏ
    const server = createServer(app);
    server.listen(PORT, () => {
      console.log(`🚀 Server is running at http://localhost:${PORT}`);
      console.log(`🧘 Yoga Playground: http://localhost:${PORT}/graphql`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

process.on('SIGINT', async () => {
  console.log('\n👋 Shutting down...');
  await mongoose.connection.close();
  process.exit(0);
});

startServer();
