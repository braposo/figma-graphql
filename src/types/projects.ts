import { gql } from "apollo-server-express";
import { createBatchResolver } from "graphql-resolve-batch";
import { ProjectSummary, ProjectFilesResponse } from "figma-js";
import { ProcessedFile } from "figma-transformer";
import { loadFile, loadProjectFiles } from "../utils/figma";
import { filterNodes } from "../utils/nodes";

export const type = gql`
    # A single Project
    type Project {
        # ID of the Project
        id: ID!
        # Name of the Project
        name: String!

        files(name: String): [File]
    }

    extend type Query {
        # Get a teams projects
        project(id: ID!, noCache: Boolean): Project
    }
`;

export const resolvers = {
    Query: {
        project: (_: never, { id, noCache }) =>
            loadProjectFiles(id, noCache).then((project) => ({ id, ...project })),
    },
    Project: {
        files: createBatchResolver<ProjectSummary | ProjectFilesResponse, any>(
            async (projects, params: { name: string } | undefined) => {
                if (projects.length === 0) {
                    return [];
                }

                // Check if projects come from qery or resolving from Teams
                function isProjectFromQuery(projs: any): projs is ProjectFilesResponse[] {
                    return projs[0].files != null;
                }

                function isProjectFromResolver(projs: any): projs is ProjectSummary[] {
                    return projs[0].files == null;
                }

                let projectFiles: ProjectFilesResponse["files"][] = [];

                if (isProjectFromQuery(projects)) {
                    projectFiles = [projects[0].files];
                }

                if (isProjectFromResolver(projects)) {
                    projectFiles = await Promise.all(
                        projects.map(async ({ id }) => {
                            const { files } = await loadProjectFiles(id);
                            return files;
                        })
                    );
                }

                // Load the full details for each file
                const parsedProjectFiles: ProcessedFile[][] = await Promise.all(
                    projectFiles.map((files) =>
                        Promise.all(files.map((file) => loadFile(file.key)))
                    )
                );

                // Filter files based on params
                if (params == null) {
                    return parsedProjectFiles;
                }

                return parsedProjectFiles.map((file) => filterNodes(Object.values(file), params));
            }
        ),
    },
};
