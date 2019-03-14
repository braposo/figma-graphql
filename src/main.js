require("dotenv").config();

const http = require("http");
const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { loadFigma, clearCache } = require("./utils");
const { schema } = require("./schema");

const PORT = 3001;

const server = new ApolloServer({ schema });

const app = express();
app.use(cors());
server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

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

httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
});
