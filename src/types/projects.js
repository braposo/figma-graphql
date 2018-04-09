const { loadTeamProjects } = require("../utils");

exports.type = `
    # A single Project
    type Project {
        # ID of the Project
        id: ID!,
        # Name of the Project
        name: String!
    }

    extend type Query {
        # Get a teams projects
        projects(id: String!): [Project]
    }
`;

exports.resolvers = {
    Query: {
        projects: (root, { id }) => loadTeamProjects(id).then(data => data.projects),
    },
};
