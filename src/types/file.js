const { loadFigma, getChildren } = require('../utils');

exports.type = `
  type File {
    name: String!
    lastModified: DateTime
    thumbnailUrl: String
    components: [String]
    pages(name: String): [Page!]
  }

  extend type Query {
    file(id: String!): File
  }
`;

exports.resolvers = {
  Query: {
    file: (root, { id }) => loadFigma(id).then(data => data)
  },
  File: {
    pages: (root, { name }) => {
      if (name) {
        return getChildren(root, 'document.children', { name });
      }

      return getChildren(root, 'document.children');
    }
  }
};
