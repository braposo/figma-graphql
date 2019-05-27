/* eslint-env jest */

const { graphql } = require("graphql");
const { schema } = require("../../schema");

const figmaFile = "cLp23bR627jcuNSoBGkhL04E";

jest.setTimeout(10000);

describe("File", () => {
    test("can get file properties", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    name
                    lastModified
                    thumbnailUrl
                    version
                }
            }
        `;

        const response = await graphql(schema, query);
        const { name, lastModified, thumbnailUrl, version } = response.data.file;

        expect(name).toEqual("figma-graphql test file");
        expect(new Date(lastModified)).toEqual(expect.any(Date));
        expect(thumbnailUrl).not.toBeNull();
        expect(version).not.toBeNull();
    });

    test("can get default file images", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    images {
                        id
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });

        expect(response).toEqual({
            data: { file: { images: [{ id: "0:1" }] } },
        });
    });

    test("can get specific file images", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    images(params: { ids: ["1:6"]}) {
                        id
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });

        expect(response).toEqual({
            data: { file: { images: [{ id: "1:6" }] } },
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

        const response = await graphql(schema, query, null, { fileId: figmaFile });

        expect(response).toMatchSnapshot();
    });
});
