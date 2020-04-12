import { ApolloServer } from "apollo-server-micro";
import type { NowRequest, NowResponse } from "@now/node";
import { schema } from "../src/schema";

const server = new ApolloServer({
    schema,
    introspection: true,
    playground: false,
});

export const config = {
    api: {
        bodyParser: false,
    },
};

export default (request: NowRequest, response: NowResponse) => {
    if (request.method === "OPTIONS") {
        return response.status(200);
    }

    const handler = server.createHandler();

    return handler(request, response);
};
