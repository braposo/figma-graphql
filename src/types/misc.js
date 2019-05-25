const { gql } = require("apollo-server-express");

exports.type = gql`
    enum Easing {
        # Ease in with an animation curve similar to CSS ease-in.
        EASE_IN

        # Ease out with an animation curve similar to CSS ease-out.
        EASE_OUT

        # Ease in and then out with an animation curve similar to CSS ease-in-out.
        EASE_IN_AND_OUT
    }

    type Position {
        # X coordinate of top left corner of the element
        x: Float

        # Y coordinate of top left corner of the element
        y: Float
    }

    type Size {
        # Width of element
        width: Float

        # Height of element
        height: Float
    }

    union RectangleBox = Position | Size

    enum BooleanOperationType {
        UNION
        INTERSECT
        SUBTRACT
        EXCLUDE
    }

    type ExportSettings {
        # File suffix to append to all filenames
        suffix: String
        # Image type, string enum that supports values JPG, PNG, and SVG
        formatString: ImageFormat
        constraint: Constraint
    }

    type Slice {
        # An array of export settings representing images to export from this node
        exportSettings: [ExportSettings]

        # Bounding box of the node in absolute space coordinates
        absoluteBoundingBox: RectangleBox

        # Width and height of element.
        size: Size
    }
`;
