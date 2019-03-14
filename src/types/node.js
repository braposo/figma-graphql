const { getPosition, getSize } = require("../utils");

exports.type = `
    enum NodeType {
        DOCUMENT
        CANVAS
        FRAME
        GROUP
        VECTOR
        BOOLEAN_OPERATION
        STAR
        LINE
        ELLIPSE
        REGULAR_POLYGON
        RECTANGLE
        TEXT
        SLICE
        COMPONENT
        INSTANCE
    }
    
    interface Node {
        id: ID!
        name: String!
        visible: Boolean!
        type: NodeType!
        position: Position,
        size: Size,
    }
`;

exports.resolvers = {
    Node: {
        position: getPosition,
        size: getSize,
    },
};
