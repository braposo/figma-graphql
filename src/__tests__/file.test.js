/* eslint-env jest */

const { graphql } = require("graphql");
const { schema } = require("../schema");

const figmaFile = "cLp23bR627jcuNSoBGkhL04E";

describe("File", () => {
    test("can get file name", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    name
                }
            }
        `;

        await expect(graphql(schema, query)).resolves.toEqual({
            data: { file: { name: "figma-graphql test file" } },
        });
    });

    test("can get file default images", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    images {
                        id
                    }
                }
            }
        `;

        await expect(graphql(schema, query, null, { fileId: figmaFile })).resolves.toEqual({
            data: { file: { images: [{ id: "0:1" }] } },
        });
    });
});
