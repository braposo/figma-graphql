import { renderPlaygroundPage } from "graphql-playground-html";
import type { NowRequest, NowResponse } from "@now/node";

export default (request: NowRequest, response: NowResponse) => {
    response.status(200).send(
        renderPlaygroundPage({
            endpoint: "/graphql",
        })
    );
};
