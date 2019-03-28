const { gql } = require("apollo-server-express");

exports.type = gql`
    type Style {
        # Font Family of the text
        fontFamily: String
        fontPostScriptName: String
        # Font Weight of the text
        fontWeight: Int
        # Font Size of the text
        fontSize: Float
        # Horizontal text alignment as string enum "LEFT" | "RIGHT" | "CENTER" | "JUSTIFIED"
        textAlignHorizontal: String
        # Vertical text alignment as string enum "TOP" | "CENTER" | "BOTTOM"
        textAlignVertical: String
        # Letter Spacing
        letterSpacing: Float
        # Line Heigh in PX
        lineHeightPx: Float
        # Line Height in Percent
        lineHeightPercent: Int
        # CSS compatible textAlign property
        textAlign: String
        # CSS compatible veticalAlign property
        verticalAlign: String
        # CSS compatible lineHeight
        lineHeight: String
    }

    type Position {
        # X value
        x: Float
        # Y value
        y: Float
    }

    type Size {
        # Width of element
        width: Float
        # Height of element
        height: Float
    }
`;

exports.resolvers = {
    Style: {
        textAlign: root => root.textAlignHorizontal.toLowerCase(),
        verticalAlign: root => root.textAlignVertical.toLowerCase(),
        lineHeight: root => `${root.lineHeightPx}px`,
    },
};
