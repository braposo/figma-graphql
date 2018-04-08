const { loadProjectFiles, getChildren } = require('../utils');

exports.type = `
    type ProjectFile {
     key: String,
     name: String,
     thumbnail_url: String,
     last_modified: String
    }

    extend type Query {
        # Get a projects files
        projectFiles(project: String!): [ProjectFile]
    }
`;

exports.resolvers = {
  Query: {
    projectFiles: (root, { project }) => loadProjectFiles(project).then(data => data.files),
  },
};
