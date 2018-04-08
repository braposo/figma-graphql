const { getChildren } = require('../utils');

exports.type = `
    type Element {
        id: String!
        name: String!
        type: String!
        blendMode: String!
        characters: String
        fill: Color,
        position: Position,
        size: Size,
        style: Style,
        strokeWeight: Int,
        strokeAlign: String,
        strokes: [Stroke]
    }
`;

exports.resolvers = {
  Element: {
    fill: (root, args) => getChildren(root, 'fills[0].color'),
    position: (root, args) => ({
      x: getChildren(root, 'absoluteBoundingBox.x'),
      y: getChildren(root, 'absoluteBoundingBox.y'),
    }),
    size: (root, args) => ({
      width: getChildren(root, 'absoluteBoundingBox.width'),
      height: getChildren(root, 'absoluteBoundingBox.height'),
    }),
  },
};
