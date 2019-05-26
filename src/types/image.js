const { loadFigmaImages } = require("../utils/figma");

const defaultImageParams = { ids: ["0:1"] };
exports.defaultImageParams = defaultImageParams;

exports.type = `
    enum ImageFormat {
        jpg
        png
        svg
    }

    input ImageParams {
        # A comma separated list of node IDs to render
        ids: [ID]

        # A number between 0.01 and 4, the image scaling factor
        scale: Int

        # A string enum for the image output format, can be "jpg", "png", or "svg"
        format: ImageFormat
    }

    input ImageNodeParams {
        # A number between 0.01 and 4, the image scaling factor
        scale: Int

        # A string enum for the image output format, can be "jpg", "png", or "svg"
        format: ImageFormat
    }

    type Image {
        id: String
        file: String
    }

    extend type Query {
        # Get just the image of a node id in a file
        images(id: ID!, params: ImageParams): [Image]
    }
`;

exports.resolvers = {
    Query: {
        images: async (root, { id, params }) => {
            const imageParams = { ...defaultImageParams, ...params };
            const { images } = await loadFigmaImages(id, imageParams).then(data => data);
            return Object.entries(images).map(entry => ({ id: entry[0], file: entry[1] }));
        },
    },
};
