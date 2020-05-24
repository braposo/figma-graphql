import "reflect-metadata";
import { ApolloServer } from "apollo-server-micro";
import type { NowRequest, NowResponse } from "@now/node";
import { buildSchema } from "type-graphql";
import { FigmaAPI } from "../src/figma-datasource";
import resolvers from "../src/resolvers";

const createServer = async () => {
    const schema = await buildSchema({
        resolvers,
    });

    const server = new ApolloServer({
        schema,
        introspection: true,
        playground: false,
        context: {
            token: process.env.FIGMA_TOKEN,
        },
        dataSources: () => ({
            figmaAPI: new FigmaAPI(),
        }),
    });

    return server.createHandler();
};

export const config = {
    api: {
        bodyParser: false,
    },
};

export default async (request: NowRequest, response: NowResponse): Promise<void> => {
    if (request.method === "OPTIONS") {
        response.status(200);
    }

    const handler = await createServer();

    return handler(request, response);
};
