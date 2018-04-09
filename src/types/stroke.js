exports.type = `
    type Stroke {
        # Type of paint as a string enum "SOLID" | "GRADIENT_LINEAR" | "GRADIENT_RADIAL" | "GRADIENT_ANGULAR" | "GRADIENT_DIAMOND" | "IMAGE" | "EMOJI"
        type: String
        # Enum describing how layer blends with layers below
        blendMode: String
        # Solid color of the paint
        color: Color
        # This field contains three vectors, each of which are a position in normalized object space (normalized object space is if the top left corner of the bounding box of the object is (0, 0) and the bottom right is (1,1)). The first position corresponds to the start of the gradient (value 0 for the purposes of calculating gradient stops), the second position is the end of the gradient (value 1), and the third handle position determines the width of the gradient (only relevant for non-linear gradients).
        gradientHandlePositions: [Position],
        # Positions of key points along the gradient axis with the colors anchored there. Colors along the gradient are interpolated smoothly between neighboring gradient stops.
        gradientStops: [GradientStops]
    }
`;
