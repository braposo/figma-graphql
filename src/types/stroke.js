exports.type = `
    type GradientStops {
        color: Color,
        position: Float
    }

    type Stroke {
        type: String
        blendMode: String
        color: Color,
        gradientHandlePositions: [Position],
        gradientStops: [GradientStops]
    }
`;
