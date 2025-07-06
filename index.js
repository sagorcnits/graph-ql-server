const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Apply middlewares
app.use(express.json());
app.use(cors());

// GraphQL schema
const typeDefs = `
  type Query {
    hello: String
  }
`;

const resolvers = {
  Query: {
    hello: () => "Hello from Apollo GraphQL!",
  },
};

async function startServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });

  await server.start();

  // ✅ Correct usage with context
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: async ({ req, res }) => ({}),
    })
  );

  app.get("/", (req, res) => {
    res.send("Server is running!....");
  });

  app.get("/new", (req, res) => {
    res.send("Server is running!.... new");
  });

  app.listen(PORT, () => {
    console.log(`✅ Server running on port graphql ${PORT}`);
  });
}

startServer();
