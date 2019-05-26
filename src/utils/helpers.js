exports.getPosition = node => ({
    x: node.absoluteBoundingBox.x,
    y: node.absoluteBoundingBox.y,
});

exports.getSize = node => ({
    width: node.absoluteBoundingBox.width,
    height: node.absoluteBoundingBox.height,
});
