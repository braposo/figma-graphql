import type { NowRequest, NowResponse } from "@now/node";
import { loadFile } from "../src/utils/figma";

export default async (request: NowRequest, response: NowResponse) => {
    const { id } = request.query;

    try {
        const data = await loadFile(Array.isArray(id) ? id[0] : id);
        response.json(data);
    } catch (e) {
        response.status(404).send("File id not found");
    }
};
