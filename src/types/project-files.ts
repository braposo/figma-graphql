import { gql } from "apollo-server-express";
import { loadProjectFiles, loadFile } from "../utils/figma";

export const type = gql`
    extend type Query {
        # Get a projects files
        projectFiles(projectId: String!, noCache: Boolean): [File]
    }
`;

export const resolvers = {
    Query: {
        projectFiles: async (_: never, { projectId, noCache }) => {
            const { files: projectFiles } = await loadProjectFiles(projectId, noCache);

            const parsedFiles = await Promise.all(
                projectFiles.map(({ key }) => loadFile(key, noCache))
            );

            return Object.values(parsedFiles);
        },
    },
};
