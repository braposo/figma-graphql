import { loadFile } from "../utils/figma";

// eslint-disable-next-line import/no-default-export
export default async (request, response) => {
    const { id } = request.query;

    try {
        const data = await loadFile(id);
        response.json(data);
    } catch (e) {
        response.status(404).send("File id not found");
    }
};
