const { gql } = require("apollo-server-express");
const { getPosition, getSize } = require("../utils");

exports.type = gql`
    # Vector node
    type Vector implements Node {
        id: ID!
        name: String!
        visible: Boolean!
        type: NodeType!
        blendMode: BlendMode!
        backgroundColor: Color!
        position: Position
        size: Size
    }
`;

exports.resolvers = {
    Vector: {
        position: getPosition,
        size: getSize,
    },
};
