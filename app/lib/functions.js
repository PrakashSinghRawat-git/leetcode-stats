import { colorsArr } from "./constants/data.js";
import { solidColorsArr } from "./constants/data.js";

export const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * colorsArr.length);
    return colorsArr[randomIndex];
};
export const getRandomSolidColor = () => {
    const randomIndex = Math.floor(Math.random() * solidColorsArr.length);
    return solidColorsArr[randomIndex];
};

export const getDate = (unixTimestamp) => {
    const date = new Date(unixTimestamp * 1000);
    return date.toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
    });
};

export const getRandomShadesColor = (colorName) => {
    let baseColor;
    switch (colorName) {
        case "green":
            baseColor = [0, 128, 0]; // Green
            break;
        case "yellow":
            baseColor = [255, 165, 0]; // Yellow
            break;
        case "red":
            baseColor = [255, 0, 0]; // Orange
            break;
        case "blue":
            baseColor = [0, 0, 100]; // Blue
            break;
        default:
            baseColor = [0, 0, 0]; // Black
    }

    const range = 100; // Range of variation for shades
    const r = baseColor[0] + Math.floor(Math.random() * range);
    const g = baseColor[1] + Math.floor(Math.random() * range);
    const b = baseColor[2] + Math.floor(Math.random() * range);

    return `rgb(${r}, ${g}, ${b},0.8)`;
};
