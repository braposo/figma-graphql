import { gql } from "apollo-server-express";
import { generateResolversForShortcuts, generateQueriesForShortcuts } from "../utils/shortcuts";
import { getSize } from "../utils/helpers";
import { nodeProperties, resolvers as nodeResolvers } from "./node";

const frameProperties = `
    ${nodeProperties}

    # Background of the node
    background: [Paint]

    # An array of export settings representing images to export from node (default: [])
    exportSettings: [ExportSettings]

    # How this node blends with nodes behind it in the scene
    blendMode: BlendMode

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

    # Whether or not this node clip content outside of its bounds
    clipsContent: Boolean

    # An array of layout grids attached to this node (default: [])
    layoutGrids: [LayoutGrid]

    # An array of effects attached to this node (default: [])
    effects: [Effect]

    # Does this node mask sibling nodes in front of it? (default: false)
    isMask: Boolean

    # Does this mask ignore fill style (like gradients) and effects? (default: false)
    isMaskOutline: Boolean

    ${generateQueriesForShortcuts()}
`;

export const type = gql`
    # A node of fixed size containing other nodes
    type Frame implements Node {
        ${frameProperties}        
    }

    type Instance implements Node {
        ${frameProperties}     
        
        # ID of component that this instance came from, refers to components table
        componentId: String
    }

    type Group implements Node {
        ${frameProperties}     
    }

    type Component implements Node {
        ${frameProperties}     
    }
`;

const frameResolvers = {
    ...nodeResolvers.Node,
    ...generateResolversForShortcuts(),
    size: getSize,
};

export const resolvers = {
    Frame: {
        ...frameResolvers,
    },
    Instance: {
        ...frameResolvers,
    },
    Group: {
        ...frameResolvers,
    },
    Component: {
        ...frameResolvers,
    },
};
