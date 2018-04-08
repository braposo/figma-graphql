const { loadFigmaImages, getChildren } = require("../utils");

exports.type = `
    input Params {
        # A comma separated list of node IDs to render
        ids: [String]

        # A number between 0.01 and 4, the image scaling factor
        scale: Int

        # A string enum for the image output format, can be "jpg", "png", or "svg"
        format: String
    }

    type Image {
        # Images for the ID's you requested
        images: [String]
    }

    extend type Query {
        # Get just the image of a node id in a file
        image(id: String!, params: Params): Image
    }
`;

exports.resolvers = {
    Query: {
        image: (root, { id, params = { ids: ["0:1"] } }) =>
            loadFigmaImages(id, params).then(data => data),
    },
    Image: {
        images: ({ images = [] }) => Object.values(images),
    },
};
