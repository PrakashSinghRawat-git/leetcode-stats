"use client";
import React, { useEffect, useState } from "react";
import globalStore from "@/app/store/globalStore";
import ProblemSolvedBarChart from "@/app/components/charts/ProblemSolvedBarChart";
import ContestAttendedChart from "@/app/components/charts/ContestAttendedChart";
import NoOfBadgesChart from "@/app/components/charts/NoOfBadgesChart";
import WorthChart from "@/app/components/charts/WorthChart";
import ContestHistoryChart from "@/app/components/charts/ContestHistoryChart";
import MulitSeriesPieQuestionsCategoryChart from "@/app/components/charts/MulitSeriesPieQuestionsCategoryChart";
import UserNamesCloud from "../comps/UserNamesCloud";
import NavItems from "../comps/NavItems";
import { updateViews } from "@/app/lib/database-calls";
import DropDownHam from "../../../components/DropDownHam";
import SkeletonComp from "@/app/components/SkeletonComp";
import ProblemsSolvedTimePeriodTabs from "@/app/components/charts/ProblemsSolvedTimePeriodBar";

import Head from "next/head";
import Ad1 from "@/app/components/ads/Ad1";

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

    const [views, setViews] = useState<number>(0);

    useEffect(() => {
        const func = async () => {
            const viewCount = await updateViews();
            setViews(viewCount);
            // console.log("views:", viewCount);
        };
        func();
    }, []);

    useEffect(() => {
        // console.log("fetching usernames");
        const fetchData = async () => {
            setIsCollectionCreated(true);

            const data = await fetchUsernames(params.group);
            if (data) {
                // console.log("client: data is ", data.usernames);
                setGroupArr(data.usernames);
            } else {
                console.log("error fetching usernames of group ", params.group);
            } // setGroupArr(data);
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
            <Head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3979558884312761"
                    crossOrigin="anonymous"
                ></script>
                {/* <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3979558884312761"
                    crossOrigin="anonymous"
                ></script> */}
            </Head>
            <div
                className="  right-5 fixed top-[92vh] z-99    "
                style={{
                    zIndex: 99,
                }}
            >
                {" "}
                <DropDownHam views={views} />
            </div>
            <div className="w-full m-5  ">
                <NavItems groupArr={groupArr} params={params} views={views} />
                <UserNamesCloud groupArr={groupArr} />
            </div>

            <div className="grid grid-cols-1 mx-auto lg:grid-cols-2   w-screen sm:w-[85vw]  gap-5 justify-center items-center mt-10 px-1">
                {usersData ? (
                    <div className="relative md:min-h-[378px]">
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                        <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4 flex-col justify-between">
                            <ProblemsSolvedTimePeriodTabs groupArr={groupArr} />
                            <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500  text-center">
                                Problems Solved Over Time
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full mx-auto flex justify-center ">
                        {" "}
                        <SkeletonComp width={400} height={200} />
                    </div>
                )}
                {usersData ? (
                    <div className="relative py-2  ">
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                        <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4  ">
                            <ProblemSolvedBarChart usersData={usersData} />
                            <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                                Total Problems Solved
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full mx-auto flex justify-center">
                        {" "}
                        <SkeletonComp width={400} height={200} />
                    </div>
                )}

                <Ad1 />

                {usersData ? (
                    <div className="relative">
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                        <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                            <WorthChart usersData={usersData} />
                            <p className="text-normal  text-[#fbbf24] sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                                Estimated Worth
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full mx-auto flex justify-center">
                        {" "}
                        <SkeletonComp width={400} height={200} />
                    </div>
                )}
                {usersData ? (
                    <div className="relative">
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                        <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                            <NoOfBadgesChart usersData={usersData} />
                            <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                                Total Badges Earned
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full mx-auto flex justify-center">
                        {" "}
                        <SkeletonComp width={400} height={200} />
                    </div>
                )}

                {usersData ? (
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
                ) : (
                    <div className="w-full mx-auto flex justify-center"></div>
                )}

                {usersData ? (
                    <div className="relative">
                        <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                        <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                            <ContestAttendedChart usersData={usersData} />
                            <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                                Total Contest Attended
                            </p>
                        </div>
                    </div>
                ) : (
                    <div className="w-full mx-auto flex justify-center">
                        {" "}
                        <SkeletonComp width={400} height={200} />
                    </div>
                )}
            </div>
            {usersData ? (
                <div className="relative w-screen sm:w-[85vw] m-5 mx-auto ">
                    <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs "></div>

                    <div className="relative   z-10 w-full border border-gray-900 rounded-sm shadow-md p-4">
                        <ContestHistoryChart
                            usersContestData={usersContestData}
                        />
                        <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                            Contest History
                        </p>
                    </div>
                </div>
            ) : (
                <div className="w-full mx-auto flex justify-center">
                    {" "}
                    <SkeletonComp width={1000} height={400} />
                </div>
            )}
        </div>
    );
};

export default Page;
