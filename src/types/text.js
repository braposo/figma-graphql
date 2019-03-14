const { gql } = require("apollo-server-express");
const { getPosition, getSize } = require("../utils");

exports.type = gql`
    # A text node
    type Text implements Node {
        id: ID!
        name: String!
        visible: Boolean!
        type: NodeType!
        blendMode: BlendMode!
        backgroundColor: Color!
        position: Position
        size: Size

        characters: String
        style: Style
    }
`;

exports.resolvers = {
    Text: {
        position: getPosition,
        size: getSize,
    },
};
