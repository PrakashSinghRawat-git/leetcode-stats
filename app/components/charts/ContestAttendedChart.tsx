import React, { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getRandomColor } from "@/app/lib/functions";

const ContestAttendedChart = ({ usersData }: any) => {
    const [contestAttendedBarData, setContestAttendedBarData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
            borderColor: string[];
            borderWidth: number;
        }[];
    }>({
        labels: [],
        datasets: [
            {
                label: "Problems Solved",
                data: [],
                backgroundColor: [],
                borderColor: ["rgba(75, 192, 192, 1)"],
                borderWidth: 1,
            },
        ],
    });

    useEffect(() => {
        if (usersData) {
            const labels = usersData.map(
                (user: any) => user.matchedUser.username
            );
            const data = usersData.map((user: any) => {
                if (user.userContestRanking) {
                    return user.userContestRanking.attendedContestsCount;
                } else {
                    return 0;
                }
            });

            // Generate random colors dynamically
            const backgroundColors = labels.map(() => {
                return getRandomColor();
            });

            setContestAttendedBarData({
                labels: labels,
                datasets: [
                    {
                        label: "Total Contests Attended",
                        data: data,
                        backgroundColor: backgroundColors,
                        borderColor: ["rgba(75, 192, 192, 1)"],
                        borderWidth: 1,
                    },
                ],
            });
        }
    }, [usersData]);

    const optionsBar: any = {
        plugins: {
            datalabels: {
                anchor: "end",
                align: "top",
                formatter: (value: string | number) => value.toString(),
                font: {
                    weight: "bold",
                },
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <Chart
                type="bar"
                data={contestAttendedBarData}
                options={optionsBar}
                plugins={[ChartDataLabels]}
            />
        </div>
    );
};

export default ContestAttendedChart;
