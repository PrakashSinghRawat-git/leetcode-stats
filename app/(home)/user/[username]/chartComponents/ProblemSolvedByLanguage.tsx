"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import { getRandomSolidColor } from "@/app/lib/functions";

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderWidth: number;
    }[];
}

const ProblemSolvedByLanguage = ({ userData }: any) => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                label: "Problems Solved by Category",
                data: [],
                backgroundColor: ["blue", "green", "yellow", "red"],
                borderWidth: 1,
            },
        ],
    });

    // Update chart data when userData changes
    useEffect(() => {
        console.log("pie chart userData:", userData);
        // Extract labels and data from userData
        const labels: string[] = [];
        const data: number[] = [];
        const colorArr: string[] = [];
        userData?.matchedUser?.languageProblemCount?.forEach((item: any) => {
            labels.push(`${item.languageName} ${item.problemsSolved}  `);
            data.push(item.problemsSolved);
            colorArr.push(getRandomSolidColor());
        });

        // Update chartData state
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: "Problems Solved by Category",
                    data: data,
                    backgroundColor: ["blue", "green", "yellow", "red"],
                    borderWidth: 1,
                },
            ],
        });
    }, [userData]);

    // Pie chart options
    const options = {
        // Add your chart options here
        // For example, you can customize the title, tooltips, etc.
        plugins: {
            title: {
                display: true,
                text: "Problems Solved by Language",
            },
        },
    };

    return (
        <div>
            <Chart type="pie" data={chartData} options={options} />
        </div>
    );
};

export default ProblemSolvedByLanguage;
