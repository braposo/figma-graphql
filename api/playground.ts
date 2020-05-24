import { renderPlaygroundPage } from "graphql-playground-html";
import type { NowRequest, NowResponse } from "@now/node";

export default (_: NowRequest, response: NowResponse): void => {
    response.status(200).send(
        renderPlaygroundPage({
            endpoint: "/graphql",
        })
    );
};
