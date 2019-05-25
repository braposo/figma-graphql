const { loadProjectFiles } = require("../utils/figma");

exports.type = `
    # A file inside a project
    type ProjectFile {
     # Key of this file
     key: String
     # Name of the file
     name: String
     # Thumbnail of the file
     thumbnail_url: String
     # Date when last modified
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
