import { gql } from "apollo-server-express";
import { createBatchResolver } from "graphql-resolve-batch";
import { loadFile, loadTeamProjects, loadProjectFiles } from "../utils/figma";

export const type = gql`
    # A single Project
    type Project {
        # ID of the Project
        id: ID!
        # Name of the Project
        name: String!

        files: [File]
    }

    extend type Query {
        # Get a teams projects
        projects(teamId: ID!): [Project]
    }
`;

export const resolvers = {
    Query: {
        projects: (root, { teamId }) => loadTeamProjects(teamId).then(({ projects }) => projects),
    },
    Project: {
        files: createBatchResolver<{ id: string }, any>(async projects => {
            const projectFiles = await Promise.all(
                projects.map(async ({ id }) => loadProjectFiles(id).then(({ files }) => files))
            );

            const parsedFiles = await Promise.all(
                projectFiles.map(files => Promise.all(files.map(file => loadFile(file.key))))
            );

            return Object.values(parsedFiles);
        }),
    },
};
