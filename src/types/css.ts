import { gql } from "apollo-server-express";

export const type = gql`
    type CSS {
        # CSS compatible textAlign property
        textAlign: String
        # CSS compatible veticalAlign property
        verticalAlign: String
        # CSS compatible lineHeight
        lineHeight: String
    }
`;

export const resolvers = {
    CSS: {
        textAlign: root => root.textAlignHorizontal.toLowerCase(),
        verticalAlign: root => root.textAlignVertical.toLowerCase(),
        lineHeight: root => `${root.lineHeightPx}px`,
    },
};
