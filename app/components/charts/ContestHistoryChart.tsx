import React, { useState, useEffect, use } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getRandomSolidColor, getDate } from "@/app/lib/functions";

const ContestAttendedChart = ({ usersContestData }: any) => {
    const [contestHistoryLineData, setContestHistoryLineData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            borderColor: string[];
            fill: boolean;
            // backgroundColor: string;
            borderWidth: number;
            pointRadius: 3; // Set the radius of the points
            pointHoverRadius: 4;
        }[];
    }>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        if (usersContestData) {
            const labelsSet = new Set<string>(); // Use a Set to store unique labels
            // Determine the number of elements to slice based on the screen width
            const screenWidth =
                window.innerWidth ||
                document.documentElement.clientWidth ||
                document.body.clientWidth;
            const sliceCount = screenWidth < 768 ? 50 : 100; // Adjust slicing based on screen width

            const datasets = usersContestData.map(
                (user: any, index: number) => {
                    const data = user.userContestRankingHistory.reduce(
                        (acc: number[], con: any) => {
                            if (con.attended) {
                                labelsSet.add(getDate(con.contest.startTime)); // Add each label to the set
                                acc.push(con.ranking);
                            }
                            return acc;
                        },
                        []
                    );

                    const backgroundColor = getRandomSolidColor();

                    return {
                        label: user.matchedUser.username,
                        data: data.slice(-sliceCount),
                        borderColor: backgroundColor,
                        fill: false,
                        borderWidth: screenWidth < 768 ? 1 : 2,
                        pointRadius: screenWidth < 768 ? 1 : 3,
                        pointHoverRadius: 4,
                    };
                }
            );

            const labels: string[] = Array.from(labelsSet).slice(-sliceCount); // Convert set back to an array

            setContestHistoryLineData({ labels: labels, datasets: datasets });
        }
    }, [usersContestData]);

    // Configuration options for the chart
    const options = {
        scales: {
            y: {
                beginAtZero: false,
                suggestedMin: -100,
            },
        },
    };

    return (
        <div className="w-full min-h-[300px] h-full ">
            <Chart
                type="line"
                data={contestHistoryLineData}
                // options={optionsBar}
                options={options}
                // plugins={[ChartDataLabels]}
                className=" min-h-[300px] h-full  w-full"
            />
        </div>
    );
};

export default ContestAttendedChart;
