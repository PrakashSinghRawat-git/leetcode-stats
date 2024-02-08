"use client";
import React, { useEffect, useState } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";

interface ChartData {
    labels: string[];
    datasets: {
        label: string;
        data: number[];
        backgroundColor: string[];
        borderWidth: number;
    }[];
}

const ProblemSolvedByCategory = ({ userData }: any) => {
    const [chartData, setChartData] = useState<ChartData>({
        labels: [],
        datasets: [
            {
                label: "Problems Solved by Category",
                data: [],
                backgroundColor: ["green", "yellow", "red"],
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
        userData?.matchedUser?.submitStatsGlobal?.acSubmissionNum?.forEach(
            (item: any) => {
                if (item.difficulty === "All") return;
                labels.push(`${item.difficulty}: ${item.count}  `);
                data.push(item.count);
            }
        );

        // Update chartData state
        setChartData({
            labels: labels,
            datasets: [
                {
                    label: "Problems Solved by Category",
                    data: data,
                    backgroundColor: [
                        "rgb(0,255,0,0.8)",
                        "rgb(255,255,0,0.8)",
                        "rgb(255,0,0,0.8)",
                    ],
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
                text: "Problems Solved by Category",
            },
        },
    };

    return (
        <div>
            <Chart type="pie" data={chartData} options={options} />
        </div>
    );
};

export default ProblemSolvedByCategory;
