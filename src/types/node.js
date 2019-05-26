const { gql } = require("apollo-server-express");
const { get } = require("lodash");
const { createBatchResolver } = require("graphql-resolve-batch");
const camelCase = require("lodash/camelCase");
const groupBy = require("lodash/groupBy");
const { loadImages } = require("../utils/figma");

const nodeProperties = `
    # A string uniquely identifying this node within the document.
    id: ID!

    # The name given to the node by the user in the tool.
    name: String!

    # Whether or not the node is visible on the canvas. (default: true)
    visible: Boolean!

    # The type of the node, refer to table below for details.
    type: NodeType!

    # Additional properties
    image(params: ImageNodeParams): Image
`;

const nodeTypes = [
    "CANVAS",
    "FRAME",
    "GROUP",
    "VECTOR",
    "BOOLEAN_OPERATION",
    "STAR",
    "LINE",
    "ELLIPSE",
    "REGULAR_POLYGON",
    "RECTANGLE",
    "TEXT",
    "SLICE",
    "COMPONENT",
    "INSTANCE",
    "STYLE",
];

exports.type = gql`
    enum NodeType {
        ${nodeTypes.join("\n")}
    }

    interface Node {
        ${nodeProperties}
    }
`;

const capitalise = string => string.charAt(0).toUpperCase() + string.slice(1);

exports.resolvers = {
    Node: {
        __resolveType({ type }) {
            if (type === "CANVAS") {
                return "Pages";
            }

            return capitalise(camelCase(type));
        },
        image: createBatchResolver(async (sources, { params }) => {
            const sourcesByFile = groupBy(sources, "fileId");
            const parsedImages = await Promise.all(
                Object.entries(sourcesByFile).map(([fileId, nodes]) =>
                    loadImages(fileId, { ...params, ids: nodes.map(({ id }) => id) }).then(
                        ({ images }) => images
                    )
                )
            );

            return parsedImages.reduce(
                (acc, parsedImage) => [
                    ...acc,
                    ...Object.entries(parsedImage).map(entry => ({ id: entry[0], file: entry[1] })),
                ],
                []
            );
        }),
        visible: root => get(root, "visible", true),
    },
    RectangleBox: {
        __resolveType({ type }) {
            return capitalise(type);
        },
    },
};

exports.nodeProperties = nodeProperties;
exports.nodeTypes = nodeTypes;
