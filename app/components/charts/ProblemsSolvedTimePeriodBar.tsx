import React, { useState, useEffect } from "react";
import { Chart } from "react-chartjs-2";
import "chart.js/auto";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { getRandomColor } from "@/app/lib/functions";
import SkeletonComp from "../SkeletonComp";
import { Card, CardContent } from "@/app/components/ui/card";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/components/ui/tabs";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const tabsObj = [
    {
        title: "Today",
        value: "today",
    },
    {
        title: "This Week",
        value: "thisWeek",
    },
    {
        title: "This Month",
        value: "thisMonth",
    },
    {
        title: "This Year",
        value: "thisYear",
    },
];

interface ProblemsSolvedTimePeriodTabsTyps {
    groupArr: string[];
}
export default function ProblemsSolvedTimePeriodTabs({
    groupArr,
}: ProblemsSolvedTimePeriodTabsTyps) {
    const handleValueChange = (value: string) => {
        console.log("value changed: ", value);
    };
    return (
        <Tabs
            defaultValue="today"
            className="w-full bg-transparent   border-transparent"
            onValueChange={handleValueChange}
        >
            <TabsList className="grid w-full grid-cols-4 bg-transparent">
                {tabsObj.map((tab, index) => (
                    <TabsTrigger key={index} value={tab.value}>
                        {tab.title}
                    </TabsTrigger>
                ))}
            </TabsList>
            {tabsObj.map((tab, index) => (
                <TabsContent
                    key={index}
                    value={tab.value}
                    className="border-transparent"
                >
                    <Card className="w-full bg-transparent border-transparent">
                        <CardContent className="bg-transparent border-transparent">
                            <ProblemSolvedBarChart
                                period={tab.value}
                                groupArr={groupArr}
                            />
                        </CardContent>
                    </Card>
                </TabsContent>
            ))}
        </Tabs>
    );
}

export const ProblemSolvedBarChart = ({
    period,
    groupArr,
}: {
    period: string;
    groupArr: string[];
}) => {
    const [problemSolvedBarData, setProblemSolvedBarData] = useState<{
        labels: string[];
        datasets: {
            label: string;
            data: number[];
            backgroundColor: string[];
            borderColor: string[];
            borderWidth: number;
        }[];
    } | null>({
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

    const [usersData, setUsersData] = useState<any>(null);

    useEffect(() => {
        const fetchSubmissionTimePeriodData = async () => {
            setProblemSolvedBarData(null);
            try {
                const res = await fetch("/api/fetchSubmissionComparison", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        usernames: groupArr,
                        period: period,
                    }),
                });

                const data = await res.json();
                console.log("timeframe data: ", data?.data);
                setUsersData(data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchSubmissionTimePeriodData();
    }, [period, groupArr]);

    useEffect(() => {
        if (usersData) {
            const labels = usersData.map(
                (user: any) => user.matchedUser.username
            );
            const data = usersData.map(
                (user: any) => user.recentAcSubmissionList
            );

            // Generate random colors dynamically
            const backgroundColors = labels.map(() => {
                return getRandomColor();
            });

            setProblemSolvedBarData({
                labels: labels,
                datasets: [
                    {
                        label: "Problems Solved",
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
        <div className="flex justify-center items-center">
            {problemSolvedBarData ? (
                <Chart
                    type="bar"
                    data={problemSolvedBarData}
                    options={optionsBar}
                    plugins={[ChartDataLabels]}
                />
            ) : (
                <div className="flex justify-evenly items-end w-full">
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton count={1} width={50} height={80} />
                    </SkeletonTheme>
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton count={1} width={50} height={150} />
                    </SkeletonTheme>
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton count={1} width={50} height={155} />
                    </SkeletonTheme>
                    <SkeletonTheme baseColor="#202020" highlightColor="#444">
                        <Skeleton count={1} width={50} height={90} />
                    </SkeletonTheme>
                </div>
            )}
        </div>
    );
};
