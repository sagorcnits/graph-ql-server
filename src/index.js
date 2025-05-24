const express = require("express");
const { ApolloServer } = require("apollo-server-express");
const cors = require("cors");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers/index");
const PORT = 5000;

const app = express();

// middleware 
app.use(express.json());
app.use(cors());

const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// root route
app.get("/", (req, res) => {
    res.send("Server is running!");
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}${server.graphqlPath}`);
});