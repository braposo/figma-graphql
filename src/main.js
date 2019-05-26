require("dotenv").config();

const cors = require("cors");
const express = require("express");
const { ApolloServer } = require("apollo-server-express");

const { loadFile } = require("./utils/figma");
const { schema } = require("./schema");

const PORT = 3001;

const server = new ApolloServer({
    schema,
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

// Get figma API response (just for testing)
app.get("/figma/:id", (req, res) => {
    const { id } = req.params;
    loadFile(id).then(data => {
        res.json(data);
    });
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
});
