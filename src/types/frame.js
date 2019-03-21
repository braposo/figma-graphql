const { gql } = require("apollo-server-express");
const capitalize = require("lodash/capitalize");
const { getChildren, removeEmpty } = require("../utils");
const { resolvers } = require("./node");

exports.type = gql`
    union Children = Text | Rectangle | Vector | Frame

    # A node of fixed size containing other nodes
    type Frame implements Node {
        id: ID!
        name: String!
        visible: Boolean!
        type: NodeType!
        position: Position
        size: Size

        blendMode: BlendMode!
        backgroundColor: Color!
        children(type: NodeType, name: String): [Children]
        clipsContent: Boolean!
    }
`;

exports.resolvers = {
    Children: {
        __resolveType(obj) {
            const { type } = obj;
            if (type === "GROUP") {
                // We alias Group to Frame since they implement the same interface
                return "Frame";
            }
            return capitalize(type);
        },
    },
    Frame: {
        ...resolvers.Node,
        children: (root, args) => {
            if (args) {
                const { type, name } = args;
                const match = removeEmpty({ type, name });
                return getChildren(root, null, match);
            }
            return getChildren(root);
        },
    },
};
