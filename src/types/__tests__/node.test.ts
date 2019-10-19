/* eslint-env jest */

import { graphql } from "graphql";
import { schema } from "../../schema";

const figmaFile = "cLp23bR627jcuNSoBGkhL04E";

jest.setTimeout(10000);

describe("Node", () => {
    test("returns default export image", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    rectangles {
                        export
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const rectangles = response.data && response.data.file.rectangles;
        rectangles.forEach(rectangle => {
            const { export: nodeExport } = rectangle;
            expect(nodeExport).not.toBeNull();
        });
    });

    test("returns jpg export", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    rectangles {
                        export(params: { format: jpg })
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const rectangles = response.data && response.data.file.rectangles;
        rectangles.forEach(rectangle => {
            const { export: nodeExport } = rectangle;
            expect(nodeExport).not.toBeNull();
        });
    });

    test("returns css export", async () => {
        const query = `
            query {
                file(id: "${figmaFile}") {
                    rectangles {
                        export(params: { format: css })
                    }
                }
            }
        `;

        const response = await graphql(schema, query, null, { fileId: figmaFile });
        expect(response.data).not.toBeUndefined();

        const rectangles = response.data && response.data.file.rectangles;
        rectangles.forEach(rectangle => {
            const { export: nodeExport } = rectangle;
            expect(nodeExport).toMatchSnapshot();
        });
    });
});
