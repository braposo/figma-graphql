import { gql } from "apollo-server-express";

export const type = gql`
    enum GridPattern {
        COLUMNS
        ROWS
        GRID
    }

    enum GridAlignment {
        # Grid starts at the left or top of the frame
        MIN

        # Grid is stretched to fit the frame
        STRETCH

        # Grid is center aligned
        CENTER
    }

    # Guides to align and place objects within a frame
    type LayoutGrid {
        # Orientation of the grid as a string
        pattern: GridPattern

        # Width of column grid or height of row grid or square grid spacing
        sectionSize: Float

        # Is the grid currently visible?
        visible: Boolean

        # Color of the grid
        color: Color

        # The following properties are only meaningful for directional grids (COLUMNS or ROWS)
        # Positioning of grid
        alignment: GridAlignment

        # Spacing in between columns and rows
        gutterSize: Float

        # Spacing before the first column or row
        offset: Float

        # Number of columns or rows
        count: Int
    }
`;

export const resolvers = {};
