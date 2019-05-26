const { gql } = require("apollo-server-express");
const { loadFigmaFile, loadFigmaImages } = require("../utils/figma");
const {
    generateResolversForShortcuts,
    generateQueriesForShortcuts,
} = require("../utils/shortcuts");
const { defaultImageParams } = require("./image");

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

        # Get images for that file
        images(params: ImageParams): [Image]

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
        images: async (_, { params }, { fileId }) => {
            const imageParams = { ...defaultImageParams, ...params };
            const { images } = await loadFigmaImages(fileId, imageParams);
            return Object.entries(images).map(entry => ({ id: entry[0], file: entry[1] }));
        },
        ...generateResolversForShortcuts(),
    },
};
