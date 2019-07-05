import { gql } from "apollo-server-express";
import { loadProjectFiles, loadFile } from "../utils/figma";

export const type = gql`
    extend type Query {
        # Get a projects files
        projectFiles(projectId: String!): [File]
    }
`;

export const resolvers = {
    Query: {
        projectFiles: async (_, { projectId }) => {
            const { files: projectFiles } = await loadProjectFiles(projectId);

            const parsedFiles = await Promise.all(projectFiles.map(({ key }) => loadFile(key)));

            return Object.values(parsedFiles);
        },
    },
};
