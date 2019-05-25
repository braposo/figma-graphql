const { gql } = require("apollo-server-express");
const {
    generateQueriesForShortcuts,
    generateResolversForShortcuts,
} = require("../utils/shortcuts");
const { nodeProperties, resolvers } = require("./node");

exports.type = gql`
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

exports.resolvers = {
    Page: {
        ...resolvers.Node,
        ...generateResolversForShortcuts(),
    },
};
