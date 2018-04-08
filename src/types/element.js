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
