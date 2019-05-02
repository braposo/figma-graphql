const { GraphQLDateTime } = require("graphql-iso-date");
const mergeSchema = require("./types");

const typeDefs = [
    `
    scalar DateTime

    type Query {
        version: String!
    }

    type Mutation {
        noop: String
    }
    
    type Subscription {
        noop: String
    }
    
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
`,
];

const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        version: () => "1.4",
    },
};

module.exports = {
    ...mergeSchema({ typeDefs, resolvers }),
};
