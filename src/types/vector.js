const { gql } = require("apollo-server-express");
const { getFill } = require("../utils");
const { resolvers } = require("./node");

exports.type = gql`
    # Vector node
    type Vector implements Node {
        id: ID!
        name: String!
        visible: Boolean!
        type: NodeType!
        blendMode: BlendMode!
        backgroundColor: Color!
        fill: Color
        image(params: ImageParams): String
        position: Position
        size: Size
    }
`;

exports.resolvers = {
    Vector: {
        ...resolvers.Node,
        fill: getFill,
    },
};
