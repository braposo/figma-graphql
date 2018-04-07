const { getChildren } = require('../utils');

exports.type = `
   type Position {
     x: Float
     y: Float
   }

   type Size {
     width: Float
     height: Float
   }

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
    fill: (root, args) => {
      return getChildren(root, 'fills[0].color');
    },
    position: (root, args) => {
      return {
        x: getChildren(root, 'absoluteBoundingBox.x'),
        y: getChildren(root, 'absoluteBoundingBox.y')
      };
    },
    size: (root, args) => {
      return {
        width: getChildren(root, 'absoluteBoundingBox.width'),
        height: getChildren(root, 'absoluteBoundingBox.height')
      };
    }
  }
};
