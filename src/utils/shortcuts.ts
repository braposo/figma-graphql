import camelCase from "lodash/camelCase";
import { nodeTypes } from "../types/node";
import { filterNodes } from "./nodes";

const shortcutTypes = nodeTypes.map((type) => {
    const convertedType = type === "CANVAS" ? "PAGE" : type;
    return camelCase(convertedType);
});

const mapTypeToFigmaType = nodeTypes.reduce(
    (acc, type) => {
        const figmaType = type === "CANVAS" ? "PAGE" : type;
        const key = `${camelCase(figmaType)}s`;
        return {
            ...acc,
            [key]: type,
        };
    },
    {
        children: "ALL",
    }
);

const mapTypeToQuery = nodeTypes.reduce(
    (acc, type) => {
        const convertedType = type === "CANVAS" ? "PAGE" : type;
        const formattedType = camelCase(convertedType);
        const key = `${formattedType}s`;
        const returnType = formattedType.charAt(0).toUpperCase() + formattedType.slice(1);
        const nodeType = type === "STYLE" ? "styleType: [StyleType]" : "type: [NodeType]";

        return {
            ...acc,
            [key]: `${key}(${nodeType}, name: String): [${returnType}!]`,
        };
    },
    {
        children: "children(type: [NodeType], name: String): [Node]",
    }
);

export const generateResolversForShortcuts = () =>
    [...shortcutTypes, "children"].reduce((acc, resolverType) => {
        const key = resolverType === "children" ? resolverType : `${resolverType}s`;
        const nodeType = mapTypeToFigmaType[key];
        const getData = (data) => (nodeType === "ALL" ? data.children : data.shortcuts[nodeType]);

        return {
            ...acc,
            [key]: (root, params) => filterNodes(getData(root), params),
        };
    }, {});

export const generateQueriesForShortcuts = () =>
    [...shortcutTypes, "children"]
        .map((type) => {
            const key = type === "children" ? type : `${type}s`;
            return mapTypeToQuery[key];
        })
        .join("\n");
