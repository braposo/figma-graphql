const { gql } = require("apollo-server-express");
const { get } = require("lodash");
const { createBatchResolver } = require("graphql-resolve-batch");
const { getPosition, getSize, loadFigmaImages } = require("../utils");

exports.type = gql`
    enum NodeType {
        DOCUMENT
        CANVAS
        FRAME
        GROUP
        VECTOR
        BOOLEAN_OPERATION
        STAR
        LINE
        ELLIPSE
        REGULAR_POLYGON
        RECTANGLE
        TEXT
        SLICE
        COMPONENT
        INSTANCE
    }

    interface Node {
        id: ID!
        name: String!
        image(params: ImageParams): String
        visible: Boolean!
        type: NodeType!
        position: Position
        size: Size
    }
`;

exports.resolvers = {
    Node: {
        image: createBatchResolver(async (sources, { params }, context, info) => {
            const { images } = await loadFigmaImages(info.variableValues.fileId, {
                ...params,
                ids: sources.map(({ id }) => id),
            });
            return Object.values(images);
        }),
        position: getPosition,
        size: getSize,
        visible: root => get(root, "visible", true),
    },
};
