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
        userData.allQuestionsCount.forEach((item: any) => {
            console.log("item:", item);
            labels.push(item.difficulty);
            data.push(item.count);
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
                text: "Sample Pie Chart",
            },
        },
    };

    return (
        <div>
            hello
            <Chart type="pie" data={chartData} options={options} />
        </div>
    );
};

export default ProblemSolvedByCategory;
