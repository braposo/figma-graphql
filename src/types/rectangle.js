const { gql } = require("apollo-server-express");
const { getPosition, getSize } = require("../utils");

exports.type = gql`
    # A rectangle node
    type Rectangle implements Node {
        id: ID!
        name: String!
        visible: Boolean!
        type: NodeType!
        blendMode: BlendMode!
        backgroundColor: Color!
        position: Position
        size: Size

        cornerRadius: Int
        rectangleCornerRadii: [Int]
    }
`;

exports.resolvers = {
    Rectangle: {
        position: getPosition,
        size: getSize,
    },
};
