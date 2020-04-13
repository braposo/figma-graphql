import { gql } from "apollo-server-express";

export const type = gql`
    enum TextCase {
        UPPER
        LOWER
        TITLE
    }

    enum TextDecoration {
        STRIKETHROUGH
        UNDERLINE
    }

    enum TextAlignHorizontal {
        LEFT
        RIGHT
        CENTER
        JUSTIFIED
    }

    enum TextAlignVertical {
        TOP
        CENTER
        BOTTOM
    }

    enum LineHeightUnit {
        PIXELS
        FONT_SIZE_PC
        INTRINSIC_PC
    }

    type TextStyle {
        # Font Family of the text
        fontFamily: String

        # PostScript font name
        fontPostScriptName: String

        # Space between paragraphs in px, 0 if not present (default: 0)
        paragraphSpacing: Float

        # Paragraph indentation in px, 0 if not present (default: 0)
        paragraphIndent: Float

        # Whether or not text is italicized
        italic: Boolean

        # Font Weight of the text
        fontWeight: Float

        # Font Size of the text
        fontSize: Float

        # Text casing applied to the node (default: ORIGINAL)
        textCase: TextCase

        # Text decoration applied to the node (default: NONE)
        textDecoration: TextDecoration

        # Horizontal text alignment
        textAlignHorizontal: TextAlignHorizontal

        # Vertical text alignment
        textAlignVertical: TextAlignVertical

        # Space between characters in px
        letterSpacing: Float

        # Line heigh in px
        lineHeightPx: Float

        # Line height as a percentage of the font size
        lineHeightPercentFontSize: Float

        # The unit of the line height value specified by the user.
        lineHeightUnit: LineHeightUnit
    }
`;

export const resolvers = {};
