const { getChildren } = require('../utils');

exports.type = `
    type Page {
        id: String!
        name: String!
        type: String!
        backgroundColor: Color,
        frames: [Frame!]
    }
`;

exports.resolvers = {
  Page: {
    frames: root => getChildren(root),
  },
};
