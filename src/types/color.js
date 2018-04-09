exports.type = `
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
    }

    # Positions of key points along the gradient axis with the colors anchored there. Colors along the gradient are interpolated smoothly between neighboring gradient stops.
    type GradientStops {
        # gradient stop color
        color: Color,
        # gradient stop position
        position: Float
    }
`;
