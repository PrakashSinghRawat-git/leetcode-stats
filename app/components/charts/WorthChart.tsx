import React, { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getRandomColor } from "@/app/lib/functions";
import { calculateLeetCodeWorth } from "@/app/lib/functions";
const WorthChart = ({ usersData }: any) => {
    const [badgesNumberBarData, setBadgesNumberBarData] = useState<{
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
                label: "Total Badges Earned",
                data: [],
                backgroundColor: [],
                borderColor: ["rgba(75, 192, 192, 1)"],
                borderWidth: 1,
            },
        ],
    });

    // useEffect(() => {
    //     if (userData === null) return;
    //     const worth = calculateLeetCodeWorth(
    //         userData?.matchedUser?.submitStatsGlobal?.acSubmissionNum,
    //         userData?.userContestRanking?.attendedContestsCount,
    //         userData?.userContestRanking?.rating,
    //         userData?.matchedUser?.ranking,
    //         userData?.matchedUser?.badges?.length
    //     );
    //     console.log("worth is: ", worth);
    //     setWorth(worth);
    // }, [userData]);

    useEffect(() => {
        if (usersData) {
            const labels = usersData.map(
                (user: any) => user.matchedUser.username
            );
            const data = usersData.map((user: any) => {
                const worth = calculateLeetCodeWorth(
                    user?.matchedUser?.submitStatsGlobal?.acSubmissionNum,
                    user?.userContestRanking?.attendedContestsCount,
                    user?.userContestRanking?.rating,
                    user?.matchedUser?.ranking,
                    user?.matchedUser?.badges?.length
                );

                return worth;
            });

            // Generate random colors dynamically
            const backgroundColors = labels.map(() => {
                return getRandomColor();
            });

            setBadgesNumberBarData({
                labels: labels,
                datasets: [
                    {
                        label: "Total Badges Earned",
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
            tooltip: {
                callbacks: {
                    // title: "title here"
                    label: (context: any) => {
                        // return `Badges: ${
                        //     data.datasets[0].data[tooltipItem.index] == 0
                        //         ? "No Badges"
                        //         : data.datasets[0].data[tooltipItem.index]
                        // }`;
                        return `Badges: ${
                            context.parsed < 1 ? "No Badges" : context.parsed
                        }`;
                    },
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
                type="doughnut"
                data={badgesNumberBarData}
                options={optionsBar}
                plugins={[ChartDataLabels]}
            />
        </div>
    );
};

export default WorthChart;
