const { makeExecutableSchema } = require("graphql-tools");
const mergeSchema = require("./types");
const { GraphQLDateTime } = require("graphql-iso-date");

const typeDefs = [
  `
    scalar DateTime

    type Query {
        version: String!
    }

    type Mutation {
        noop: String
    }
`
];

const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    version: () => "1"
  }
};

module.exports = {
  schema: makeExecutableSchema(mergeSchema({ typeDefs, resolvers })),
  context: req => {
    return {};
  }
};
