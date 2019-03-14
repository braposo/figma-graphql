const { gql } = require("apollo-server-express");
const { resolvers } = require("./vector");

exports.type = gql`
    # A text node
    type Text implements Node {
        id: ID!
        name: String!
        visible: Boolean!
        type: NodeType!
        blendMode: BlendMode!
        backgroundColor: Color!
        fill: Color
        position: Position
        size: Size

        characters: String
        style: Style
    }
`;

exports.resolvers = {
    Text: {
        ...resolvers.Vector,
    },
};
