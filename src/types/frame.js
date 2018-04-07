const { getChildren, removeEmpty } = require('../utils');

exports.type = `
  type Frame {
    id: String!
    name: String!
    type: String!
    blendMode: String!
    backgroundColor: Color!
    clipsContent: Boolean!
    elements(type: String, name: String): [Element!]
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
    }
  }
};
