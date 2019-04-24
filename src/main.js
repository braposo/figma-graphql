require("dotenv").config();

const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");
const expressPlayground = require("graphql-playground-middleware-express").default;

const app = express();
const { loadFigma, clearCache } = require("./utils");

const { typeDefs, resolvers } = require("./schema");

const PORT = 3001;

app.use(cors());

// Get figma API response (just for testing)
app.get("/figma/:id", (req, res) => {
    const { id } = req.params;
    loadFigma(id).then(data => {
        res.json(data);
    });
});

// Clears cache for specific figma file
app.get("/clear/:id", (req, res) => {
    const { id } = req.params;
    clearCache(id);

    res.status(200).send("Cache cleared");
});

// Show GraphiQL for everything else!
app.get(
    "*",
    expressPlayground({
        endpoint: "/graphql",
    })
);

app.listen(PORT, () => {
    // eslint-disable-next-line
    console.log(`Server running at http://localhost:${PORT}`);
});

// GraphQL endpoint
const server = new ApolloServer({
    // These will be defined for both new or existing servers
    typeDefs,
    resolvers,
});

server.applyMiddleware({ app });
