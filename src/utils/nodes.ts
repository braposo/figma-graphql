export const getNodes = (data, nodeType, filterBy) => {
    const { name: filterByName, type: filterByType } = filterBy;
    const dataNodes = nodeType === "ALL" ? data.children : data.shortcuts[nodeType];

    if (dataNodes == null) {
        return [];
    }

    if (filterByType != null) {
        return dataNodes.filter(node => filterByType.includes(node.styleType));
    }

    if (filterByName != null) {
        const nameRegex = new RegExp(filterByName);
        return dataNodes.filter(node => nameRegex.test(node.name));
    }

    return dataNodes;
};
