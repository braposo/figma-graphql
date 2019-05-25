const groupBy = require("lodash/groupBy");
const uniqBy = require("lodash/uniqBy");

const groupNodes = nodes => groupBy(uniqBy(nodes, "id"), "type");
exports.groupNodes = groupNodes;

exports.getNodes = (data, nodeType, filterBy) => {
    const { name: filterByName, type: filterByType } = filterBy;
    let dataNodes;

    if (nodeType !== "ALL") {
        dataNodes = data.shortcuts[nodeType];
    } else {
        dataNodes =
            filterByType == null
                ? data.children
                : data.children.filter(node => filterByType.includes(node.type));
    }

    if (dataNodes == null) {
        return [];
    }

    if (filterByName != null) {
        // TODO: compare by regex instead so we can have smarter matches
        return dataNodes.filter(node => node.name === filterByName);
    }

    return dataNodes;
};

exports.processNodes = (nodes, documentStyles) => {
    const parsedStyles = new Map(Object.entries(documentStyles));

    const traverseChildren = (node, parentId) => {
        const { id, styles, children, ...rest } = node;
        let nodeStyles = [];

        // If node has styles definitions populate that with the actual styles
        if (styles != null) {
            nodeStyles = Object.entries(styles).map(([key, styleId]) => {
                const documentStyle = parsedStyles.get(styleId);

                return {
                    id: styleId,
                    ...documentStyle,
                    style: node[`${key}s`],
                    type: "STYLE",
                };
            });
        }

        // Reached a leaf so returning the simplified node
        if (children == null || children.length === 0) {
            return [[{ id, parentId, ...rest }], nodeStyles];
        }

        // If it gets here then it means it has children
        // so we're going to recursively go through them
        // and combine everything
        const [parsedChildren, shortcuts] = children.reduce(
            (acc, child) => {
                const [accChildren, accShortcuts] = acc;
                const [tChildren, tShortcuts] = traverseChildren(child, id);
                return [
                    [...accChildren, ...tChildren],
                    [...accShortcuts, ...tChildren, ...tShortcuts],
                ];
            },
            [[], []]
        );

        // Finally we return the parsed node with the
        // parsed children grouped by type
        const parsedNode = {
            id,
            parentId,
            ...rest,
            children: parsedChildren,
            shortcuts: groupNodes(shortcuts),
        };

        return [[parsedNode], shortcuts];
    };

    return traverseChildren(nodes);
};
