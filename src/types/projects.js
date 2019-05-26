const { createBatchResolver } = require("graphql-resolve-batch");
const { loadFile, loadTeamProjects, loadProjectFiles } = require("../utils/figma");

exports.type = `
    # A single Project
    type Project {
        # ID of the Project
        id: ID!,
        # Name of the Project
        name: String!

        files: [File]
    }

    extend type Query {
        # Get a teams projects
        projects(teamId: ID!): [Project]
    }
`;

exports.resolvers = {
    Query: {
        projects: (root, { teamId }) => loadTeamProjects(teamId).then(({ projects }) => projects),
    },
    Project: {
        files: createBatchResolver(async projects => {
            const projectFiles = await Promise.all(
                projects.map(async project =>
                    loadProjectFiles(project.id).then(({ files }) => files)
                )
            );

            const parsedFiles = await Promise.all(
                projectFiles.map(files => Promise.all(files.map(file => loadFile(file.key))))
            );

            return Object.values(parsedFiles);
        }),
    },
};
