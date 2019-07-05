import { gql } from "apollo-server-express";
import { generateQueriesForShortcuts, generateResolversForShortcuts } from "../utils/shortcuts";
import { nodeProperties, resolvers as nodeResolvers } from "./node";

export const type = gql`
    # A page inside a file - This is CANVAS in Figma API
    type Page implements Node {
        ${nodeProperties}

        # Background color of the canvas
        backgroundColor: Color

        # Node ID that corresponds to the start frame for prototypes
        prototypeStartNodeID: String

        # An array of export settings representing images to export from the canvas (default: [])
        exportSettings: [ExportSettings]
        
        ${generateQueriesForShortcuts()}
    }
`;

export const resolvers = {
    Page: {
        ...nodeResolvers.Node,
        ...generateResolversForShortcuts(),
    },
};
