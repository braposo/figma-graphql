import { Color } from "figma-js";
import { ColorMode } from "../types/helpers/style";

export const getPosition = node => ({
    x: node.absoluteBoundingBox.x,
    y: node.absoluteBoundingBox.y,
});

export const getSize = node => ({
    width: node.absoluteBoundingBox.width,
    height: node.absoluteBoundingBox.height,
});

export const addUnit = (string?: string | number, unit: string = "px") =>
    string != null ? `${string}${unit}` : string;

export const getColor = ({ r, g, b, a }: Color, mode: ColorMode) => `rgba(${r}, ${g}, ${b}, ${a})`;

export const JSToCSS = cssObject => {
    return Object.entries(cssObject)
        .map(([key, value]) => {
            if (value == null) {
                return value;
            }

            return `${key.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)}: ${value};`;
        })
        .filter(Boolean)
        .join(" ");
};

export const generateCSS = node => {
    const styles = {
        textAlign: node.style && node.style.textAlignHorizontal.toLowerCase(),
        verticalAlign: node.style && node.style.textAlignVertical.toLowerCase(),
        lineHeight: node.style && addUnit(node.style.lineHeightPx),
        width: node.absoluteBoundingBox && addUnit(node.absoluteBoundingBox.width),
        height: node.absoluteBoundingBox && addUnit(node.absoluteBoundingBox.height),
        backgroundColor: node.backgroundColor && getColor(node.backgroundColor, ColorMode.RGB),
    };

    return JSToCSS(styles);
};
