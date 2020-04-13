/* eslint-env jest */

import { filterNodes } from "../nodes";

const data = [
    {
        name: "Simple Test",
        type: "CANVAS",
        styleType: "TEXT",
    },
    {
        name: "Untitled",
        type: "FRAME",
        styleType: "FILL",
    },
    {
        name: "figma-graphql test file",
        type: "RECTANGLE",
        styleType: "FILL",
    },
];

describe("Nodes utils", () => {
    test("returns empty array if data is undefined", () => {
        const filteredNodes = filterNodes(undefined, {});

        expect(filteredNodes).toHaveLength(0);
    });

    test("returns same data if no filter params", () => {
        const filteredNodes = filterNodes(data, {});

        expect(filteredNodes).toEqual(data);
    });

    test("can filter nodes by name", () => {
        const namedNodes = filterNodes(data, { name: "test" });
        const partialNodes = filterNodes(data, { name: "tled" });
        const startNodes = filterNodes(data, { name: "^fi" });
        const endNodes = filterNodes(data, { name: "est$" });
        const emptyNodes = filterNodes(data, { name: "asd" });

        expect(namedNodes).toHaveLength(2);
        expect(partialNodes).toHaveLength(1);
        expect(startNodes).toHaveLength(1);
        expect(endNodes).toHaveLength(1);
        expect(emptyNodes).toHaveLength(0);
    });

    test("can filter nodes by type", () => {
        const filteredNodes = filterNodes(data, { type: "CANVAS" });
        const emptyNodes = filterNodes(data, { type: "STAR" });

        expect(filteredNodes).toHaveLength(1);
        expect(emptyNodes).toHaveLength(0);
    });

    test("can filter nodes by styleType", () => {
        const filteredNodes = filterNodes(data, { styleType: "FILL" });
        const emptyNodes = filterNodes(data, { styleType: "GRID" });

        expect(filteredNodes).toHaveLength(2);
        expect(emptyNodes).toHaveLength(0);
    });
});
