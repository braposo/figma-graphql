require("dotenv").config();

const { graphqlExpress } = require("apollo-server-express");
const express = require("express");
const cors = require("cors");

const app = express();
const bodyParser = require("body-parser");
const { loadFigma, clearCache } = require("./utils");
const expressPlayground = require("graphql-playground-middleware-express").default;

const { schema, context } = require("./schema");

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

// GraphQL endpoint
app.use(
    "/graphql",
    bodyParser.json(),
    graphqlExpress(req => ({
        // GraphQL’s data schema
        schema,
        // Pretty Print the JSON response
        pretty: true,
        // Enable GraphiQL dev tool
        graphiql: false,
        tracing: true,
        context: context(req),
    }))
);

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
