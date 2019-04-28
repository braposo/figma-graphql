/* eslint-env jest */

const { makeExecutableSchema, mockServer } = require("graphql-tools");
const { graphql } = require("graphql");
const { typeDefs, resolvers } = require("../schema");

describe("Schema", () => {
    const mockSchema = makeExecutableSchema({ typeDefs, resolvers });

    test("has valid type definitions", async () => {
        await expect(async () => {
            const server = mockServer(typeDefs);

            await server.query("{ __schema { types { name } } }");
        }).not.toThrow();
    });

    test("query has version", async () => {
        const query = `
            query {
                version
            }
        `;

        await expect(graphql(mockSchema, query)).resolves.toEqual({ data: { version: "1.4" } });
    });
});
