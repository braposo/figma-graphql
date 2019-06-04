import { gql } from "apollo-server-express";

export const type = gql`
    enum BlendMode {
        PASS_THROUGH
        NORMAL
        DARKEN
        MULTIPLY
        LINEAR_BURN
        COLOR_BURN
        LIGHTEN
        SCREEN
        LINEAR_DODGE
        COLOR_DODGE
        OVERLAY
        SOFT_LIGHT
        HARD_LIGHT
        DIFFERENCE
        EXCLUSION
        HUE
        SATURATION
        COLOR
        LUMINOSITY
    }

    enum StrokeAlign {
        INSIDE
        OUTSIDE
        CENTER
    }

    enum StrokeCap {
        NONE
        ROUND
        SQUARE
        LINE_ARROW
        TRIANGLE_ARROW
    }

    enum StrokeJoin {
        MITER
        BEVEL
        ROUND
    }

    enum PaintType {
        SOLID
        GRADIENT_LINEAR
        GRADIENT_RADIAL
        GRADIENT_ANGULAR
        GRADIENT_DIAMOND
        IMAGE
        EMOJI
    }

    enum StyleType {
        FILL
        TEXT
        EFFECT
        GRID
    }

    type Style {
        key: String
        name: String
        type: StyleType
    }

    enum ScaleMode {
        FILL
        FIT
        TILE
        STRETCH
    }

    type Paint {
        type: PaintType

        # Is the paint enabled? (default: true)
        visible: Boolean

        # Overall opacity of paint (colors within the paint can also have opacity values which would blend with this) (default: 1)
        opacity: Float

        # For solid paints:
        # Solid color of the paint
        color: Color

        # For gradient paints:
        # How this node blends with nodes behind it in the scene
        blendMode: BlendMode

        # This field contains three vectors, each of which are a position in normalized object space (normalized object space is if the top left corner of the bounding box of the object is (0, 0) and the bottom right is (1,1)). The first position corresponds to the start of the gradient (value 0 for the purposes of calculating gradient stops), the second position is the end of the gradient (value 1), and the third handle position determines the width of the gradient.
        gradientHandlePositions: [Position]

        # Positions of key points along the gradient axis with the colors anchored there. Colors along the gradient are interpolated smoothly between neighboring gradient stops.
        gradientStops: [ColorStop]

        # For image paints:
        # Image scaling mode
        scaleMode: ScaleMode

        # Amount image is scaled by in tiling, only present if scaleMode is TILE
        scalingFactor: Float

        # A reference to an image embedded in the file.
        imageRef: String
    }

    # An RGBA color
    type Color {
        # Red channel value, between 0 and 1
        r: Float
        # Green channel value, between 0 and 1
        g: Float
        # Blue channel value, between 0 and 1
        b: Float
        # Alpha channel value, between 0 and 1
        a: Float

        # TODO: add hex value
    }

    # A position color pair representing a gradient stop
    type ColorStop {
        # gradient stop color
        color: Color
        # gradient stop position
        position: Float
    }

    enum ColorMode {
        RGB
        HEX
        HSL
    }
`;

export enum ColorMode {
    RGB,
    HEX,
    HSL,
}

export const resolvers = {};
