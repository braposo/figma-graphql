import { gql } from "apollo-server-express";

export const type = gql`
    enum ConstraintType {
        SCALE
        WIDTH
        HEIGHT
    }

    enum VerticalConstraint {
        # Node is laid out relative to top of the containing frame
        TOP

        # Node is laid out relative to bottom of the containing frame
        BOTTOM

        # Node is vertically centered relative to containing frame
        CENTER

        # Both top and bottom of node are constrained relative to containing frame (node stretches with frame)
        TOP_BOTTOM

        # Node scales vertically with containing frame
        SCALE
    }

    enum HorizontalConstraint {
        # Node is laid out relative to left of the containing frame
        LEFT

        # Node is laid out relative to right of the containing frame
        RIGHT

        # Node is vertically centered relative to containing frame
        CENTER

        # Both left and right of node are constrained relative to containing frame (node stretches with frame)
        LEFT_RIGHT

        # Node scales vertically with containing frame
        SCALE
    }

    # Sizing constraint for exports
    type Constraint {
        # Type of constraint to apply
        type: ConstraintType

        value: Float
    }

    # Layout constraint relative to containing Frame
    type LayoutConstraint {
        vertical: VerticalConstraint
        horizontal: HorizontalConstraint
    }
`;
