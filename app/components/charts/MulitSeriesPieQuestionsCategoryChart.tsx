import React, { useState, useEffect, use } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getRandomShadesColor } from "@/app/lib/functions";
import { useTheme } from "next-themes";

const MultiSeriesPieQuestionsCategoryChart = ({ usersData }: any) => {
    const [datasetsData, setDatasetsData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
        }[];
    }>({
        labels: ["Easy", "Medium", "Hard", "All"],
        datasets: [],
    });

    useEffect(() => {
        if (usersData) {
            const userLabels = usersData.map(
                (user: any) => user.matchedUser.username
            );
            const categories = ["All", "Easy", "Medium", "Hard"];

            const datasets = categories.map(
                (category: string, index: number) => {
                    const data = usersData.map((user: any) => {
                        const categoryData =
                            user.matchedUser.submitStatsGlobal.acSubmissionNum.find(
                                (item: any) => item.difficulty === category
                            );
                        return categoryData ? categoryData.count : 0;
                    });

                    let backgroundColors: string[] = [];
                    if (category === "Easy") {
                        backgroundColors = data.map(() =>
                            getRandomShadesColor("green")
                        );
                    } else if (category === "Medium") {
                        backgroundColors = data.map(() =>
                            getRandomShadesColor("yellow")
                        );
                    } else if (category === "Hard") {
                        backgroundColors = data.map(() =>
                            getRandomShadesColor("red")
                        );
                    } else if (category === "All") {
                        backgroundColors = data.map(() =>
                            getRandomShadesColor("blue")
                        );
                    }

                    return {
                        label: category,
                        data: data,
                        backgroundColor: backgroundColors,
                    };
                }
            );

            setDatasetsData({ labels: userLabels, datasets: datasets });
        }
    }, [usersData]);

    const optionsPie: any = {
        plugins: {
            datalabels: {
                formatter: (value: string | number) => value.toString(),
                font: {
                    weight: "bold",
                },
            },
            legend: {
                labels: {
                    // Hard-coded legend labels and colors
                    generateLabels: function () {
                        return [
                            {
                                text: "All",
                                fillStyle: "blue",
                                fontColor: "blue",
                            }, // Change the textColor property
                            {
                                text: "Easy",
                                fillStyle: "green",
                                fontColor: "green",
                            }, // Change the textColor property
                            {
                                text: "Medium",
                                fillStyle: "orange",
                                fontColor: "orange",
                            }, // Change the textColor property
                            {
                                text: "Hard",
                                fillStyle: "red",
                                fontColor: "red",
                            }, // Change the textColor property
                        ];
                    },
                },
            },
        },
        borderWidth: 1,
    };

    return (
        <div>
            <Chart
                type="pie"
                data={datasetsData}
                options={optionsPie}
                plugins={[ChartDataLabels]}
            />
        </div>
    );
};

export default MultiSeriesPieQuestionsCategoryChart;
