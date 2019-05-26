const { loadProjectFiles, loadFile } = require("../utils/figma");

exports.type = `
    extend type Query {
        # Get a projects files
        projectFiles(projectId: String!): [File]
    }
`;

exports.resolvers = {
    Query: {
        projectFiles: async (_, { projectId }) => {
            const { files: projectFiles } = await loadProjectFiles(projectId);

            const parsedFiles = await Promise.all(projectFiles.map(({ key }) => loadFile(key)));

            return Object.values(parsedFiles);
        },
    },
};
