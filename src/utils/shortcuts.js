const camelCase = require("lodash/camelCase");
const { nodeTypes } = require("../types/node");
const { getNodes } = require("./nodes");

const shortcutTypes = nodeTypes.map(type => {
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
        return {
            ...acc,
            [key]: `${key}(name: String): [${returnType}!]`,
        };
    },
    {
        children: "children(type: [NodeType], name: String): [Node!]",
    }
);

exports.generateResolversForShortcuts = () =>
    [...shortcutTypes, "children"].reduce((acc, resolverType) => {
        const key = resolverType === "children" ? resolverType : `${resolverType}s`;
        return {
            ...acc,
            [key]: (root, { type, name }) =>
                getNodes(root, mapTypeToFigmaType[key], { type, name }),
        };
    }, {});

exports.generateQueriesForShortcuts = () =>
    [...shortcutTypes, "children"]
        .map(type => {
            const key = type === "children" ? type : `${type}s`;
            return mapTypeToQuery[key];
        })
        .join("\n");
