const { getChildren, removeEmpty } = require('../utils');

exports.type = `
    # A node of fixed size containing other nodes
    type Frame {
        id: String!
        name: String!
        type: String!
        # How this node blends with nodes behind it in the scene
        blendMode: String!
        # Background color of the node
        backgroundColor: Color!
        # Does this node clip content outside of its bounds?
        clipsContent: Boolean!
        # Elements in this node
        elements(type: String, name: String): [Element!]
        # Position of node
        position: Position,
        # Size of node
        size: Size,
    }
`;

exports.resolvers = {
  Frame: {
    elements: (root, args) => {
      if (args) {
        const { type, name } = args;
        const match = removeEmpty({ type, name });
        return getChildren(root, null, match);
      }

      return getChildren(root);
    },
    position: root => ({
      x: getChildren(root, 'absoluteBoundingBox.x'),
      y: getChildren(root, 'absoluteBoundingBox.y'),
    }),
    size: root => ({
      width: getChildren(root, 'absoluteBoundingBox.width'),
      height: getChildren(root, 'absoluteBoundingBox.height'),
    }),
  },
};
