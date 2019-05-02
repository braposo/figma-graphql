/* eslint-env jest */

const { mockServer } = require("graphql-tools");
const { graphql } = require("graphql");
const { schema } = require("../schema");

describe("Schema", () => {
    test("query has version", async () => {
        const query = `
            query {
                version
            }
        `;

        await expect(graphql(schema, query)).resolves.toEqual({ data: { version: "1.4" } });
    });

    test("has valid type definitions", async () => {
        await expect(async () => {
            const server = mockServer(schema);

            await server.query("{ __schema { types { name } } }");
        }).not.toThrow();
    });
});
