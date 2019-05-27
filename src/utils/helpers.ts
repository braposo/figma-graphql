export const getPosition = node => ({
    x: node.absoluteBoundingBox.x,
    y: node.absoluteBoundingBox.y,
});

export const getSize = node => ({
    width: node.absoluteBoundingBox.width,
    height: node.absoluteBoundingBox.height,
});
