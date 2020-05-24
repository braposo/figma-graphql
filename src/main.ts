import "reflect-metadata";
import { buildSchema } from "type-graphql";
import cors from "cors";
import express from "express";
import { ApolloServer } from "apollo-server-express";
import { config } from "dotenv";
import { FigmaAPI } from "./figma-datasource";
import resolvers from "./resolvers";

config();

const PORT = 3001;

export type AppContext = {
    token: string;
    dataSources: {
        figmaAPI: FigmaAPI;
    };
};

async function start() {
    const schema = await buildSchema({
        resolvers,
    });

    const server = new ApolloServer({
        schema,
        introspection: true,
        tracing: true,
        playground: true,
        context: {
            token: process.env.FIGMA_TOKEN,
        },
        dataSources: () => ({
            figmaAPI: new FigmaAPI(),
        }),
    });

    const app = express();
    app.use(cors());
    server.applyMiddleware({ app });

    app.listen(PORT, () => {
        // eslint-disable-next-line no-console
        console.log(`🚀 Server ready at http://localhost:${PORT}`);
    });
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
start();
