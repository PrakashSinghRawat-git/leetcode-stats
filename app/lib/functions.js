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
        Easy: 5,
        Medium: 10,
        Hard: 20,
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
        questionsWorth += 1000 * contestsAttended;
    }

    console.log("questionsWorth", questionsWorth);

    // Calculate worth based on rating

    if (rating) {
        if (ranking < 1000000) {
            questionsWorth += (1 - sigmoid(rating)) * 100000;
        }
    }
    if (ranking) {
        if (ranking < 1000000) {
            questionsWorth += (1 - sigmoid(ranking)) * 100000;
        }
    }

    console.log("questionsWorth", questionsWorth);

    // Calculate total worth
    if (badges) {
        questionsWorth += badges * 1000;
    }

    console.log("questionsWorth", questionsWorth);

    return questionsWorth;
}
//  ********************************************USER SUBMISSION******************************************************* //
const submissionCalendar = {
    1674259200: 3,
    1674604800: 3,
    1674691200: 3,
    1674777600: 2,
    1674864000: 11,
    1674950400: 6,
    1675296000: 2,
    1675382400: 3,
    1675468800: 6,
    1686528000: 1,
    1691280000: 8,
    1691452800: 4,
    1691712000: 1,
    1692403200: 3,
    1692576000: 1,
    1693267200: 1,
    1693612800: 2,
    1696291200: 2,
};

// function categorizeTimestamps(submissionCalendar) {
export function categorizeTimestamps() {
    const currentDate = new Date();
    const categorizedTimestamps = {
        today: 0,
        yesterday: 0,
        "this week": 0,
        "this month": 0,
        "this year": 0,
    };
    const yearlyTimestamps = {};

    // Iterate through the timestamps
    for (const timestamp in submissionCalendar) {
        const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds

        // Calculate the difference in days
        const diffDays = Math.floor(
            (currentDate - date) / (1000 * 60 * 60 * 24)
        );

        // Determine the time period
        let timePeriod;
        if (diffDays === 0) {
            timePeriod = "today";
        } else if (diffDays === 1) {
            timePeriod = "yesterday";
        } else if (diffDays < 7) {
            timePeriod = "this week";
        } else if (
            date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear()
        ) {
            timePeriod = "this month";
        } else if (date.getFullYear() === currentDate.getFullYear()) {
            timePeriod = "this year";
        } else {
            timePeriod = date.getFullYear().toString();
        }

        // Increment the count for the corresponding time period
        if (timePeriod === "this year") {
            yearlyTimestamps[date.getFullYear()] =
                (yearlyTimestamps[date.getFullYear()] || 0) +
                submissionCalendar[timestamp];
        } else {
            categorizedTimestamps[timePeriod] += submissionCalendar[timestamp];
        }
    }

    // Combine the categorized timestamps with yearly timestamps
    for (const year in yearlyTimestamps) {
        categorizedTimestamps[year] = yearlyTimestamps[year];
    }

    console.log("categorizedTimestamps", categorizedTimestamps);
    return categorizedTimestamps;
}
