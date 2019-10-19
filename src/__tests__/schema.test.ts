/* eslint-env jest */

import { mockServer } from "graphql-tools";
import { graphql } from "graphql";
import { schema } from "../schema";

describe("Schema", () => {
    test("query has version", async () => {
        const query = `
            query {
                version
            }
        `;

        await expect(graphql(schema, query)).resolves.toEqual({ data: { version: "1.4" } });
    });

    test("has valid type definitions", () => {
        expect(async () => {
            const server = mockServer(schema, {});

            await server.query("{ __schema { types { name } } }");
        }).not.toThrow();
    });
});
