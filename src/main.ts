import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { loadFile } from "./utils/figma";
import { schema } from "./schema";

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
    loadFile(id).then((data) => {
        res.json(data);
    });
});

app.get("*", (req, res) => {
    res.redirect(server.graphqlPath);
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
