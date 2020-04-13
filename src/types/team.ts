import { gql } from "apollo-server-express";
import { TeamProjectsResponse } from "figma-js";
import { filterNodes } from "../utils/nodes";
import { loadTeamProjects } from "../utils/figma";

export const type = gql`
    type Team {
        name: String
        projects(name: String): [Project]
    }

    extend type Query {
        # Get a teams projects
        team(id: ID!, noCache: Boolean): Team
    }
`;

export const resolvers = {
    Query: {
        team: (_: never, { id, noCache }) => loadTeamProjects(id, noCache).then((data) => data),
    },
    Team: {
        projects: (team: TeamProjectsResponse, params: { name: string }) => {
            if (team.projects.length === 0) {
                return [];
            }

            const filteredProjects: TeamProjectsResponse["projects"] = filterNodes(
                team.projects,
                params
            );

            return filteredProjects;
        },
    },
};
