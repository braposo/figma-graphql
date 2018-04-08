const { getChildren } = require('../utils');

exports.type = `
    type Element {
        id: String!
        name: String!
        type: String!
        # How this node blends with nodes behind it in the scene
        blendMode: String!
        # Text contained within text box
        characters: String
        # The fill of this node
        fill: Color
        # position of the node
        position: Position
        # size of the node
        size: Size
        # all style rules applied to this node
        style: Style
        # The weight of strokes on the node
        strokeWeight: Int
        # Where stroke is drawn relative to the vector outline as a string enum
        # "INSIDE": draw stroke inside the shape boundary
        # "OUTSIDE": draw stroke outside the shape boundary
        # "CENTER": draw stroke centered along the shape boundary
        strokeAlign: String
        # Strokes applied to this node
        strokes: [Stroke]
    }
`;

exports.resolvers = {
  Element: {
    fill: root => getChildren(root, 'fills[0].color'),
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
