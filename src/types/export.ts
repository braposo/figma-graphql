import { gql } from "apollo-server-express";
import { loadImages } from "../utils/figma";

export const defaultImageParams = { ids: ["0:1"] };

export const type = gql`
    enum ImageFormat {
        jpg
        png
        svg
    }

    enum ExportFormat {
        jpg
        png
        svg
        css
    }

    input ImageParams {
        # A comma separated list of node IDs to render
        ids: [ID]

        # A number between 0.01 and 4, the image scaling factor
        scale: Int

        # A string enum for the image output format, can be "jpg", "png", or "svg"
        format: ImageFormat
    }

    input ExportParams {
        # A number between 0.01 and 4, the image scaling factor
        scale: Int

        # A string enum for the image output format, can be "jpg", "png", or "svg"
        format: ExportFormat
    }

    type ExportResult {
        id: String
        output: String
    }

    extend type Query {
        # Get just the image of a node id in a file
        exports(id: ID!, params: ImageParams): [ExportResult]
    }
`;

export const resolvers = {
    Query: {
        exports: async (root, { id, params }) => {
            const imageParams = { ...defaultImageParams, ...params };
            const { images } = await loadImages(id, imageParams).then((data) => data);
            return Object.entries(images).map((entry) => ({ id: entry[0], output: entry[1] }));
        },
    },
};
