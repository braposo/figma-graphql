import { gql } from "apollo-server-express";
import { loadFile, loadImages, loadComments } from "../utils/figma";
import { generateResolversForShortcuts, generateQueriesForShortcuts } from "../utils/shortcuts";
import { defaultImageParams } from "./image";

export const type = gql`
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

        # Get images for the file
        images(params: ImageParams): [Image]

        # Get comments for the file
        comments: [Comment]

        ${generateQueriesForShortcuts()}
    }

    extend type Query {
        # get a file information
        file(id: ID!): File
    }
`;

export const resolvers = {
    Query: {
        file: (_, { id }) => loadFile(id).then(data => data),
    },
    File: {
        images: async ({ fileId }, { params }) => {
            const imageParams = { ...defaultImageParams, ...params };
            const { images } = await loadImages(fileId, imageParams);
            return Object.entries(images).map(entry => ({ id: entry[0], file: entry[1] }));
        },
        comments: ({ fileId }) => loadComments(fileId).then(({ comments }) => comments),
        ...generateResolversForShortcuts(),
    },
};
