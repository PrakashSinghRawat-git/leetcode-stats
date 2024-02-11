"use client";

import { useEffect, useState } from "react";
import ProblemSolvedByCategory from "./chartComponents/ProblemSolvedByCategory";
import ProblemSolvedByLanguage from "./chartComponents/ProblemSolvedByLanguage";
import ContestHistoryChart from "@/app/components/charts/ContestHistoryChart";
import { InfiniteMovingCards } from "@/app/components/ui/infinite-moving-cards";
import UserProfileCards from "./chartComponents/UserProfileCards";
import { calculateLeetCodeWorth } from "@/app/lib/functions";
import DropDownHam from "../../../components/DropDownHam";
// import Loading from "./loading";
import { updateViews } from "@/app/lib/database-calls";

import SkeletonComp from "@/app/components/SkeletonComp";

// import { Suspense } from "react";

export default function Page({ params }: { params: { username: string } }) {
    const [userData, setUserData] = useState<any>(null);
    const [userContestData, setUserContestData] = useState<any>(null);
    const [worth, setWorth] = useState<number>(0);
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
        const fetchData = async () => {
            try {
                const objectWithData = {
                    username: params.username,
                    year: 2023,
                };
                // console.log("calling api with objectWithData", objectWithData);
                const res = await fetch("/api/fetchCompleteUserDetail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(objectWithData),
                });

                const data = await res.json();
                // console.log("userdata is : ", data?.data?.data);

                setUserData(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (userData === null) return;
        const worth = calculateLeetCodeWorth(
            userData?.matchedUser?.submitStatsGlobal?.acSubmissionNum,
            userData?.userContestRanking?.attendedContestsCount,
            userData?.userContestRanking?.rating,
            userData?.matchedUser?.ranking,
            userData?.matchedUser?.badges?.length
        );
        // console.log("worth is: ", worth);
        setWorth(worth);
    }, [userData]);

    useEffect(() => {
        if (userData === null) return;
        const fetchContestData = async () => {
            try {
                const res = await fetch("/api/fetchContestDataComparison", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ usernames: [params.username] }),
                });

                const data = await res.json();
                // console.log("constes data:", data);

                setUserContestData(data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchContestData();
    }, [userData]);

    return (
        <div className="max-w-[100vw] overflow-hidden relative">
            {/* <Suspense fallback={<p>Loading....</p>}> */}
            {/* <Suspense fallback={<Loading />}> */}
            <>
                <div
                    className="  right-5 fixed top-[92vh] z-99    "
                    style={{
                        zIndex: 99,
                    }}
                >
                    {" "}
                    <DropDownHam views={views} />
                </div>
                <div className="w-full">
                    {userData ? (
                        <div className="w-full px-2">
                            <UserProfileCards
                                matchedUserData={userData?.matchedUser}
                                worth={worth}
                            />
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 gap:5 md:gap-[200px] items-center justify-center mt-10">
                            <div className="col-span-2 md:col-span-1 mx-auto">
                                {" "}
                                <SkeletonComp width={400} height={200} />
                            </div>
                            <div className="col-span-2 md:col-span-1 mx-auto">
                                {" "}
                                <SkeletonComp width={400} height={200} />
                            </div>
                        </div>
                    )}
                    {userData ? (
                        <div className=" w-full  mx-auto md:w-[90%]">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs "></div>

                                <div className="relative z-10   border border-gray-900 rounded-sm shadow-md p-4">
                                    <InfiniteMovingCards
                                        items={userData?.matchedUser?.badges}
                                    />
                                    <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                                        Badges Earned:{" "}
                                        {userData?.matchedUser?.badges.length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="mx-auto  justify-center my-10">
                            <SkeletonComp height={100} width={1000} />
                        </div>
                    )}
                    {userData ? (
                        <div className="grid grid-cols-1 lg:grid-cols-2 mx-auto  w-screen sm:w-[85vw]  gap-5 justify-center items-center mt-10 px-2">
                            <div className="relative">
                                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                                <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                                    <ProblemSolvedByCategory
                                        userData={userData}
                                    />

                                    <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                                        Total Problems Solved
                                    </p>
                                </div>
                            </div>
                            <div className="relative">
                                <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs max-w-[600px]"></div>

                                <div className="relative z-10 max-w-[600px] border border-gray-900 rounded-sm shadow-md p-4">
                                    <ProblemSolvedByLanguage
                                        userData={userData}
                                    />

                                    <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                                        Problems Solved by Language
                                    </p>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full flex justify-center items-center gap-[120px]">
                            <SkeletonComp width={400} height={400} />
                            <SkeletonComp width={400} height={400} />
                        </div>
                    )}
                    {userData ? (
                        <div className="relative w-screen sm:w-[85vw] m-5 mx-auto px-2">
                            <div className="absolute inset-0 bg-gray-900 bg-opacity-50 backdrop-blur-xs "></div>

                            <div className="relative   z-10 w-full border border-gray-900 rounded-sm shadow-md p-4 min-h-[300px]">
                                <ContestHistoryChart
                                    usersContestData={userContestData}
                                />
                                <p className="text-normal sm:text-md font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-4 text-center">
                                    Contest History
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div className="w-full mx-auto flex justify-center my-10">
                            <SkeletonComp width={800} height={600} />
                        </div>
                    )}
                </div>
            </>
            {/* </Suspense> */}
        </div>
    );
}
