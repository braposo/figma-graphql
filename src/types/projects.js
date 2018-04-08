const { loadTeamProjects } = require('../utils');

exports.type = `
    type Project {
        id: ID!,
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
