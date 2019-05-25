const { makeExecutableSchema } = require("graphql-tools");
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
`,
];

const resolvers = {
    DateTime: GraphQLDateTime,
    Query: {
        version: () => "1.4",
    },
};

module.exports = {
    schema: makeExecutableSchema(mergeSchema({ typeDefs, resolvers })),
};
