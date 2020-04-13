type FilterBy = {
    name?: string;
    type?: string;
    styleType?: string;
};

export const filterNodes = (data: readonly any[] | undefined, filterBy: FilterBy) => {
    const { name: filterByName, type: filterByType, styleType: filterByStyleType } = filterBy;

    if (data == null) {
        return [];
    }

    if (filterByType != null) {
        return data.filter((node) => filterByType.includes(node.type));
    }

    if (filterByStyleType != null) {
        return data.filter((node) => filterByStyleType.includes(node.styleType));
    }

    if (filterByName != null) {
        const nameRegex = new RegExp(filterByName, "i");
        return data.filter((node) => nameRegex.test(node.name));
    }

    return data;
};
