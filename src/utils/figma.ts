import * as Figma from "figma-js";
import { config } from "dotenv";
import { processNodes, groupNodes } from "./nodes";

config();

const client = Figma.Client({
    personalAccessToken: process.env.FIGMA_TOKEN,
});

const { file, fileImages, comments, postComment, teamProjects, projectFiles } = client;

function getFigma(
    label: string,
    fn,
    id: string,
    params: any
): Promise<any> {
    return new Promise((resolve, reject) => {
        const withParams = params ? { ...params } : null;

        // eslint-disable-next-line no-console
        console.log("fetching", label, id);
        fn(id, withParams)
            .then(({ data }) => {
                if (label === "file") {
                    const { name, lastModified, thumbnailUrl, version, document, styles } = data;

                    const [processedNodes, processedShortcuts] = processNodes(document, styles, id);

                    const result = {
                        fileId: id,
                        name,
                        lastModified,
                        thumbnailUrl,
                        version,
                        children: processedNodes,
                        shortcuts: groupNodes(processedShortcuts),
                    };

                    resolve(result);
                } else {
                    resolve(data);
                }
            })
            .catch(reject);
    });
}

export const loadFile = (id: string) => getFigma("file", file, id, null);

export const loadComments = (id: string) => getFigma("comments", comments, id, null);

export const loadImages = (id: string, params) => getFigma("images", fileImages, id, params);

export const loadTeamProjects = (id: string) => getFigma("projects", teamProjects, id, null);

export const loadProjectFiles = (id: string) => getFigma("projectFiles", projectFiles, id, null);

export const createComment = (id: string, params) =>
    getFigma("postComment", postComment, id, params);
