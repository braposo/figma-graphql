import { gql } from "apollo-server-express";
import { nodeProperties, resolvers as nodeResolvers } from "./node";
import { getSize } from "../utils/helpers";

export const vectorProperties = `
    ${nodeProperties}

    # An array of export settings representing images to export from node
    exportSettings: [ExportSettings]

    # How this node blends with nodes behind it in the scene (see blend mode section for more details)
    blendMode: BlendMode!

    # Keep height and width constrained to same ratio (default: false)
    preserveRatio: Boolean

    # Horizontal and vertical layout constraints for node
    constraints: LayoutConstraint

    # Node ID of node to transition to in prototyping (default: null)
    transitionNodeID: String

    # The duration of the prototyping transition on this node (in milliseconds) (default: null)
    transitionDuration: Float

    # The easing curve used in the prototyping transition on this node (default: null)
    transitionEasing: Easing

    # Opacity of the node (default: 1)
    opacity: Float

    # Bounding box of the node in absolute space coordinates
    absoluteBoundingBox: RectangleBox

    # Shortcut for x and y coordinates in absoluteBoundingBox property
    position: Position

    # Width and height of element. This is different from the width and height of the bounding box in that the absolute bounding box represents the element after scaling and rotation. Only present if geometry=paths is passed
    size: Size

    # An array of effects attached to this node (default: [])
    effects: [Effect]

    # Does this node mask sibling nodes in front of it? (default: false)
    isMask: Boolean

    # An array of fill paints applied to the node
    fills: [Paint]

    # Only specified if parameter geometry=paths is used. An array of paths representing the object fill
    fillGeometry: [String]

    # An array of stroke paints applied to the node (default: [])
    strokes: [Paint]

    # The weight of strokes on the node
    strokeWeight: Float

    # A string describing the end caps of vector paths (default: NONE)
    strokeCap: StrokeCap

    # A string describing how corners in vector paths are rendered. (default: MITER)
    strokeJoin: StrokeJoin

    # An array of floating point numbers describing the pattern of dash length and gap lengths that the vector path follows. For example a value of [1, 2] indicates that the path has a dash of length 1 followed by a gap of length 2, repeated. (default: [])
    strokeDashes: [Float]

    # Only valid if strokeJoin is "MITER". The corner angle, in degrees, below which strokeJoin will be set to "BEVEL" to avoid super sharp corners. (default: 28.96)
    strokeMiterAngle: Float

    # Only specified if parameter geometry=paths is used. An array of paths representing the object stroke
    strokeGeometry: [String]

    # Where stroke is drawn relative to the vector outline as a string 
    strokeAlign: StrokeAlign

    # A set of properties that can be applied to nodes and published. 
    styles: [Style]
`;

export const type = gql`
    # Vector node
    type Vector implements Node {
        ${vectorProperties}
    }

    type BooleanOperation implements Node {
        ${vectorProperties}

        # An array of nodes that are being boolean operated on
        children: [Node]

        # A string indicating the type of boolean operation applied
        booleanOperation: BooleanOperationType
    }

    type Rectangle implements Node {
        ${vectorProperties}

        # Radius of each corner of the rectangle if a single radius is set for all corners
        cornerRadius: Float

        # Array of length 4 of the radius of each corner of the rectangle, starting in the top left and proceeding clockwise
        rectangleCornerRadii: [Float]
    }

    type Text implements Node {
        ${vectorProperties}

        # Text contained within text box
        characters: String

        # Style of text including font family and weight
        style: TextStyle
    }

    type Star implements Node {
        ${vectorProperties}
    }

    type Line implements Node {
        ${vectorProperties}
    }

    type Ellipse implements Node {
        ${vectorProperties}
    }

    type RegularPolygon implements Node {
        ${vectorProperties}
    }
`;

const vectorResolvers = {
    size: getSize,
};

export const resolvers = {
    Vector: {
        ...nodeResolvers.Node,
        ...vectorResolvers,
    },

    BooleanOperation: {
        ...nodeResolvers.Node,
        ...vectorResolvers,
    },

    Rectangle: {
        ...nodeResolvers.Node,
        ...vectorResolvers,
    },

    Text: {
        ...nodeResolvers.Node,
        ...vectorResolvers,
    },

    Star: {
        ...nodeResolvers.Node,
        ...vectorResolvers,
    },

    Line: {
        ...nodeResolvers.Node,
        ...vectorResolvers,
    },

    Ellipse: {
        ...nodeResolvers.Node,
        ...vectorResolvers,
    },

    RegularPolygon: {
        ...nodeResolvers.Node,
        ...vectorResolvers,
    },
};
