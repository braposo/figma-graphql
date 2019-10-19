/* eslint-env jest */

import { graphql } from "graphql";
import { schema } from "../../schema";

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
        const { name, lastModified, thumbnailUrl, version } = response.data && response.data.file;

        expect(name).toEqual("figma-graphql test file");
        expect(new Date(lastModified)).toEqual(expect.any(Date));
        expect(thumbnailUrl).not.toBeNull();
        expect(version).not.toBeNull();
    });

    test("can get default file exports", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    exports {
                        id
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });

        expect(response).toMatchSnapshot();
    });

    test("can get specific file exports", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    exports(params: { ids: ["1:6"]}) {
                        id
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });

        expect(response).toMatchSnapshot();
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
