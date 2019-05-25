exports.getPosition = node => ({
    x: node.absoluteBoundingBox.x,
    y: node.absoluteBoundingBox.y,
});

exports.getSize = node => ({
    width: node.absoluteBoundingBox.width,
    height: node.absoluteBoundingBox.height,
});

exports.getFileId = str => {
    const regex = /file\(id: "(\w+)"\)/g;
    const res = regex.exec(str);

    return res && res[1];
};
