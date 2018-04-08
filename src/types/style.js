exports.type = `
    type Style {
        fontFamily: String
        fontPostScriptName: String
        fontWeight: Int
        fontSize: Float,
        textAlignHorizontal: String,
        textAlignVertical: String,
        letterSpacing: Float,
        lineHeightPx: Float,
        lineHeightPercent: Int
    }

    type Position {
        x: Float
        y: Float
    }

    type Size {
        width: Float
        height: Float
    }
`;
