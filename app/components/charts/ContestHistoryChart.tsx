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
        }[];
    }>({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        console.log("contestHistoryLineData:", contestHistoryLineData);
    }, [contestHistoryLineData]);
    useEffect(() => {
        if (usersContestData) {
            const labelsSet = new Set<string>(); // Use a Set to store unique labels

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
                        data: data.slice(-100),
                        borderColor: backgroundColor,
                        fill: false,
                        borderWidth: 2,
                    };
                }
            );

            const labels: string[] = Array.from(labelsSet).splice(-100); // Convert set back to an array

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
        <div className="w-full ">
            <Chart
                type="line"
                data={contestHistoryLineData}
                // options={optionsBar}
                options={options}
                // plugins={[ChartDataLabels]}
            />
        </div>
    );
};

export default ContestAttendedChart;
