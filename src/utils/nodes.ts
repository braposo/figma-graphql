type FilterBy = {
    name?: string;
    type?: string;
    styleType?: string;
};

export const filterNodes = <T extends FilterBy>(data: T[] | undefined, filterBy: FilterBy): T[] => {
    const { name: filterByName, type: filterByType, styleType: filterByStyleType } = filterBy;

    if (data == null || data.length === 0) {
        return [];
    }

    if (filterByType != null) {
        return data.filter((node) => (node.type ? filterByType.includes(node.type) : true));
    }

    if (filterByStyleType != null) {
        return data.filter((node) =>
            node.styleType ? filterByStyleType.includes(node.styleType) : true
        );
    }

    if (filterByName != null) {
        const nameRegex = new RegExp(filterByName, "i");
        return data.filter((node) => (node.name ? nameRegex.test(node.name) : true));
    }

    return data;
};
