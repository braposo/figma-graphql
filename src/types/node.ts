import { gql } from "apollo-server-express";
import { createBatchResolver } from "graphql-resolve-batch";
import camelCase from "lodash/camelCase";
import groupBy from "lodash/groupBy";
import { loadImages } from "../utils/figma";

export const nodeProperties = `
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

export const nodeTypes = [
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

export const type = gql`
    enum NodeType {
        ${nodeTypes.join("\n")}
    }

    interface Node {
        ${nodeProperties}
    }
`;

const capitalise = string => string.charAt(0).toUpperCase() + string.slice(1);

export const resolvers = {
    Node: {
        __resolveType({ type }) {
            if (type === "CANVAS") {
                return "Pages";
            }

            return capitalise(camelCase(type));
        },
        image: createBatchResolver<any, any>(async (sources, { params }) => {
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
        visible: root => root.visible || true,
    },
    RectangleBox: {
        __resolveType({ type }) {
            return capitalise(type);
        },
    },
};
