const { gql } = require("apollo-server-express");
const { getFill, getPosition, getSize } = require("../utils");

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
        position: Position
        size: Size
    }
`;

exports.resolvers = {
    Vector: {
        position: getPosition,
        size: getSize,
        fill: getFill,
    },
};
