/* eslint-env jest */

import { graphql } from "graphql";
import schema from "../../schema";

const figmaFile = "cLp23bR627jcuNSoBGkhL04E";

jest.setTimeout(10000);

describe("Export", () => {
    test("returns default export image", async () => {
        const query = `
            query {
                exports(id: "${figmaFile}") {
                    id
                    output
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).toBeDefined();

        const fileExports = response.data && response.data.exports;
        fileExports.forEach(fileExport => {
            const { id, output } = fileExport;
            expect(id).toEqual("0:1");
            expect(output).not.toBeNull();
        });
    });

    test("returns specific export image", async () => {
        const nodeIds = ["1:6", "28:4"];
        const query = `
            query {
                exports(id: "${figmaFile}", params: { ids: ${JSON.stringify(nodeIds)}}) {
                    id
                    output
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).toBeDefined();

        const fileExports: { id: string; output: string }[] =
            response.data && response.data.exports;
        fileExports.forEach((fileExport, index) => {
            const { id, output } = fileExport;
            expect(id).toEqual(nodeIds[index]);
            expect(output).not.toBeNull();
        });
    });

    test("returns svg format export", async () => {
        const query = `
            query {
                exports(id: "${figmaFile}", params: { format:svg }) {
                    id
                    output
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).toBeDefined();

        const fileExports = response.data && response.data.exports;
        fileExports.forEach(fileExport => {
            const { id, output } = fileExport;
            expect(id).toEqual("0:1");
            expect(output).not.toBeNull();
        });
    });

    test("returns jpg format export", async () => {
        const query = `
            query {
                exports(id: "${figmaFile}", params: { format:jpg }) {
                    id
                    output
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).toBeDefined();

        const fileExports = response.data && response.data.exports;
        fileExports.forEach(fileExport => {
            const { id, output } = fileExport;
            expect(id).toEqual("0:1");
            expect(output).not.toBeNull();
        });
    });
});
