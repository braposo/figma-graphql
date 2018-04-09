const { loadFigma, getChildren } = require("../utils");

exports.type = `
    # Information about a file
    type File {
        # name of the file
        name: String!
        # date the file was last modified
        lastModified: DateTime
        # the url to a thumbnail of the file
        thumbnailUrl: String
        # list of components in this file
        components: [String]
        # list of pages in this file
        pages(name: String): [Page!]
    }

    extend type Query {
        # get a file information
        file(id: String!): File
    }
`;

exports.resolvers = {
    Query: {
        file: (root, { id }) => loadFigma(id).then(data => data),
    },
    File: {
        pages: (root, { name }) => {
            if (name) {
                return getChildren(root, "document.children", { name });
            }

            return getChildren(root, "document.children");
        },
    },
};
