import { makeExecutableSchema } from "graphql-tools";
import { GraphQLDateTime } from "graphql-iso-date";
import mergeSchema from "./types";

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

export default makeExecutableSchema(mergeSchema({ typeDefs, resolvers }));
