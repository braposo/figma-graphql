const { gql } = require("apollo-server-express");

exports.type = gql`
    type CSS {
        # CSS compatible textAlign property
        textAlign: String
        # CSS compatible veticalAlign property
        verticalAlign: String
        # CSS compatible lineHeight
        lineHeight: String
    }
`;

exports.resolvers = {
    CSS: {
        textAlign: root => root.textAlignHorizontal.toLowerCase(),
        verticalAlign: root => root.textAlignVertical.toLowerCase(),
        lineHeight: root => `${root.lineHeightPx}px`,
    },
};
