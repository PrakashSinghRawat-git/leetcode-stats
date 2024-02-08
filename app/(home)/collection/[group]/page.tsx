"use client";
import React, { useEffect, useState } from "react";
import globalStore from "@/app/store/globalStore";
import ProblemSolvedBarChart from "@/app/components/charts/ProblemSolvedBarChart";
import ContestAttendedChart from "@/app/components/charts/ContestAttendedChart";
import NoOfBadgesChart from "@/app/components/charts/NoOfBadgesChart";
import ContestHistoryChart from "@/app/components/charts/ContestHistoryChart";
import MulitSeriesPieQuestionsCategoryChart from "@/app/components/charts/MulitSeriesPieQuestionsCategoryChart";
import ThemeChanger from "@/app/components/ThemeChanger";
import UserNamesCloud from "../comps/UserNamesCloud";
import NavItems from "../comps/NavItems";

import { fetchUsernames } from "@/app/lib/database-calls";
const Page = ({ params }: { params: { group: string } }) => {
    const {
        groupArr,
        setGroupArr,
        isCollectionCreated,
        setIsCollectionCreated,
    } = globalStore();
    // const { isCollectionCreated, setIsCollectionCreated } = globalStore();
    // const groupArr = ["ayushman_sinha", "neal_wu", "numb3r5", "fmota"];

    const [usersData, setUsersData] = useState<any>(null);
    const [usersContestData, setUsersContestData] = useState<any>(null);

    useEffect(() => {
        console.log("fetching usernames");
        const fetchData = async () => {
            if (params.group !== "temp") {
                setIsCollectionCreated(true);

                const data = await fetchUsernames(params.group);
                if (data) {
                    console.log("client: data is ", data.usernames);
                    setGroupArr(data.usernames);
                } else {
                    console.log(
                        "error fetching usernames of group ",
                        params.group
                    );
                } // setGroupArr(data);
            }
        };

        fetchData();
    }, [params]);
    useEffect(() => {
        if (groupArr.length == 0) return;
        const fetchData = async () => {
            try {
                const res = await fetch("/api/fetchComparisonData", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ usernames: groupArr }),
                });

                const data = await res.json();
                // console.log("response data:", data);
                setUsersData(data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [groupArr]);
    useEffect(() => {
        if (usersData === null) return;
        const fetchContestData = async () => {
            try {
                const res = await fetch("/api/fetchContestDataComparison", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ usernames: groupArr }),
                });

                const data = await res.json();
                // console.log("constes data:", data);

                setUsersContestData(data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchContestData();
    }, [usersData]);

    return (
        <div className="flex-col justify-center items-center text-gray-200">
            <div className="w-full m-5  ">
                <NavItems groupArr={groupArr} params={params} />
                <UserNamesCloud groupArr={groupArr} />
            </div>

            <div className="grid grid-cols-1 mx-auto lg:grid-cols-2   w-screen sm:w-[85vw]  gap-5 justify-center items-center mt-10">
                <div className="relative">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                    <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                        <ProblemSolvedBarChart usersData={usersData} />
                        <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                            Total Problems Solved
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                    <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                        <ContestAttendedChart usersData={usersData} />
                        <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                            Total Contest Attended
                        </p>
                    </div>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                    <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                        <NoOfBadgesChart usersData={usersData} />
                        <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                            Total Badges Earned
                        </p>
                    </div>
                </div>

                <div className="relative">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                    <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                        <MulitSeriesPieQuestionsCategoryChart
                            usersData={usersData}
                        />{" "}
                        <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                            Problems Solved by Category
                        </p>
                    </div>
                </div>
            </div>
            <div className="relative w-screen sm:w-[85vw] m-5 mx-auto ">
                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs "></div>

                <div className="relative   z-10 w-full border border-gray-900 rounded-sm shadow-md p-4">
                    <ContestHistoryChart usersContestData={usersContestData} />
                    <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                        Contest History
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Page;
