/* eslint-env jest */

const { makeExecutableSchema } = require("graphql-tools");
const { graphql } = require("graphql");
const { typeDefs, resolvers } = require("../schema");

const figmaFile = "cLp23bR627jcuNSoBGkhL04E";

describe("File", () => {
    const mockSchema = makeExecutableSchema({ typeDefs, resolvers });

    test("can get file name", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    name
                }
            }
        `;

        await expect(graphql(mockSchema, query)).resolves.toEqual({
            data: { file: { name: "figma-graphql test file" } },
        });
    });
});
