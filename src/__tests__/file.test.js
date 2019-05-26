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

    test("can get file comments", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    comments {
                        id
                        message
                        file_key
                        order_id
                        parent_id
                        created_at
                        client_meta {
                                  node_id
                          node_offset {
                            x
                            y
                          }
                        }
                        resolved_at
                      }
                }
            }
        `;

        await expect(graphql(schema, query, null, { fileId: figmaFile })).resolves.toEqual({
            data: {
                file: {
                    comments: [
                        {
                            id: "6907475",
                            message: "Testing comment",
                            file_key: "cLp23bR627jcuNSoBGkhL04E",
                            order_id: 1,
                            parent_id: "",
                            created_at: "2019-05-26T17:47:36Z",
                            client_meta: {
                                node_id: "28:5",
                                node_offset: {
                                    x: 111,
                                    y: 22,
                                },
                            },
                            resolved_at: null,
                        },
                    ],
                },
            },
        });
    });
});
