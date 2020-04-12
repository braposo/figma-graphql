import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { schema } from "./schema";

const PORT = 3001;

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: true,
});

const app = express();
app.use(cors());
server.applyMiddleware({ app });

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
