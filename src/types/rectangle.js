const { gql } = require("apollo-server-express");
const { resolvers } = require("./vector");

exports.type = gql`
    # A rectangle node
    type Rectangle implements Node {
        id: ID!
        name: String!
        visible: Boolean!
        type: NodeType!
        blendMode: BlendMode!
        backgroundColor: Color!
        fill: Color
        position: Position
        size: Size

        cornerRadius: Int
        rectangleCornerRadii: [Int]
    }
`;

exports.resolvers = {
    Rectangle: {
        ...resolvers.Vector,
    },
};
