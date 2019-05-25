const { gql } = require("apollo-server-express");
const { loadFigmaFile } = require("../utils/figma");
const {
    generateResolversForShortcuts,
    generateQueriesForShortcuts,
} = require("../utils/shortcuts");

exports.type = gql`
    # Information about a file
    type File {
        # name of the file
        name: String!
        
        # date the file was last modified
        lastModified: DateTime

        # the url to a thumbnail of the file
        thumbnailUrl: String

        # Current version of the file
        version: String

        ${generateQueriesForShortcuts()}
    }

    extend type Query {
        # get a file information
        file(id: ID!): File
    }
`;

exports.resolvers = {
    Query: {
        file: (_, { id }) => loadFigmaFile(id).then(data => data),
    },
    File: {
        ...generateResolversForShortcuts(),
    },
};
