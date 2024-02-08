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

const sigmoid = (x) => {
    return 2 / (1 + Math.exp(-x)) - 1;
};

// Function to calculate LeetCode profile worth
export function calculateLeetCodeWorth(
    submissionArr,
    contestsAttended,
    rating,
    ranking,
    badges
) {
    console.log(submissionArr, contestsAttended, rating, ranking, badges);
    // Define weights for different difficulty levels
    const weights = {
        All: 0,
        Easy: 50,
        Medium: 100,
        Hard: 150,
    };
    let questionsWorth = 0;
    console.log("questionsWorth", questionsWorth);

    // Calculate worth based on questions solved
    if (submissionArr && submissionArr.length > 0) {
        submissionArr.forEach((submission) => {
            questionsWorth += submission.count * weights[submission.difficulty];
        });
    }

    console.log("questionsWorth", questionsWorth);

    // Calculate worth based on contests attended
    if (contestsAttended) {
        questionsWorth += 10000 * contestsAttended;
    }

    console.log("questionsWorth", questionsWorth);

    // Calculate worth based on rating

    if (rating) {
        if (ranking < 1000000) {
            questionsWorth += (1 - sigmoid(rating)) * 1000000;
        }
    }
    if (ranking) {
        if (ranking < 1000000) {
            questionsWorth += (1 - sigmoid(ranking)) * 1000000;
        }
    }

    console.log("questionsWorth", questionsWorth);

    // Calculate total worth
    if (badges) {
        questionsWorth += badges * 10000;
    }

    console.log("questionsWorth", questionsWorth);

    return questionsWorth;
}
