const { getChildren } = require("../utils");

exports.type = `
    # A page inside a file
    type Page {
        id: ID!
        # name of the page
        name: String!
        # the type of the node
        type: String!
        # BG of the page
        backgroundColor: Color,
        # A node of fixed size containing other nodes
        frames: [Frame!]
    }
`;

exports.resolvers = {
    Page: {
        frames: root => getChildren(root),
    },
};
