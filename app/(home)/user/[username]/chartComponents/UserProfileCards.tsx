import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
    MapPin,
    GraduationCap,
    Github,
    Linkedin,
    Twitter,
    Globe,
    Eye,
    MessageSquareText,
    Star,
    CheckSquare2,
    Dot,
} from "lucide-react";
import SkeletonComp from "@/app/components/SkeletonComp";

const UserProfileCards = ({ matchedUserData, worth }: any) => {
    return (
        <section className="w-full  ">
            <div className="w-full  md:w-[90vw] sm:w-full grid grid-cols-2 gap-y-2 my-5  justify-center md:justify-between">
                <div
                    className="col-span-2  md:col-span-1 bg-opacity-50 flex-col px-2 justify-start items-start  w-full md:w-[40vw]  mx-auto max-w-full relative rounded-2xl border border-b-0 flex-shrink-0   border-slate-700 p-2 "
                    style={{
                        background:
                            "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                    }}
                >
                    <div className="flex w-full justify-evenly">
                        <div className=" flex-col   justify-start items-start min-w-[150px]   ">
                            <Image
                                src={matchedUserData?.profile?.userAvatar}
                                width={80}
                                height={80}
                                alt="profile-pic"
                                className="rounded-md my-1 ml-3 md:mt-2 md:mx-auto w-fit-content w-[80px] "
                            ></Image>

                            <div className="relative z-20 mt-3 flex flex-row items-start justify-start md:justify-center">
                                <span className="flex flex-col">
                                    <span className=" text-sm  text-center leading-[1.6] text-gray-200 font-normal">
                                        {matchedUserData?.profile?.realName}{" "}
                                    </span>

                                    <span className=" text-xs  text-center leading-[1.6] text-gray-400 font-normal">
                                        {matchedUserData?.username}
                                    </span>
                                    <span className=" text-sm  text-center leading-[1.6] text-gray-200 font-normal">
                                        <span className="text-gray-400">
                                            Rank:{" "}
                                        </span>
                                        <span className="text-gray-200 mt-2">
                                            &nbsp;
                                            {
                                                matchedUserData?.profile
                                                    ?.ranking
                                            }{" "}
                                        </span>
                                    </span>
                                </span>
                            </div>

                            <div className="text-[#fbbf24] mt-5 w-full flex-col justify-center items-center   md:text-center">
                                <p className="text-lg font-bold tracking-widest ">
                                    $ {worth}
                                </p>
                                <p className="text-xs text-gray-300">
                                    Estimated Worth
                                </p>
                            </div>
                        </div>
                        <blockquote className="mt-5  md:ml-10 w-full">
                            <div className="relative z-20 mt-1 flex flex-row items-start justify-start ">
                                <span className="flex flex-col">
                                    <span className="  gap-2 text-center leading-[1.6] text-gray-400 font-normal">
                                        {matchedUserData?.profile
                                            ?.countryName && (
                                            <p className="flex justify-start items-center gap-2  ">
                                                <MapPin
                                                    width={20}
                                                    className="text-blue-500"
                                                />
                                                <span>
                                                    {
                                                        matchedUserData?.profile
                                                            ?.countryName
                                                    }
                                                </span>
                                            </p>
                                        )}
                                        {matchedUserData?.profile?.school && (
                                            <p className="flex justify-start items-center gap-2 w-fit pr-5 ">
                                                <GraduationCap width={20} />
                                                <span>
                                                    {
                                                        matchedUserData?.profile
                                                            ?.school
                                                    }
                                                </span>
                                            </p>
                                        )}
                                        {matchedUserData?.githubUrl && (
                                            <Link
                                                href={
                                                    matchedUserData?.githubUrl
                                                }
                                                target="_blank"
                                                className="flex justify-start items-center gap-2 w-fit pr-5 "
                                            >
                                                <Github width={20} />
                                                <span>Github</span>
                                            </Link>
                                        )}
                                        {matchedUserData?.linkedinUrl && (
                                            <Link
                                                href={
                                                    matchedUserData?.linkedinUrl
                                                }
                                                target="_blank"
                                                className="flex justify-start items-center gap-2 w-fit pr-5 "
                                            >
                                                <Linkedin width={20} />
                                                <span>Linkedin</span>
                                            </Link>
                                        )}
                                        {matchedUserData?.twitterUrl && (
                                            <Link
                                                href={
                                                    matchedUserData?.twitterUrl
                                                }
                                                target="_blank"
                                                className="flex justify-start items-center gap-2 w-fit pr-5 "
                                            >
                                                <Twitter width={20} />
                                                <span>Twitter</span>
                                            </Link>
                                        )}
                                        {matchedUserData?.profile?.websites
                                            .length > 0 &&
                                            matchedUserData?.profile?.websites.map(
                                                (
                                                    item: string,
                                                    index: number
                                                ) => (
                                                    <Link
                                                        key={index}
                                                        href={item}
                                                        target="_blank"
                                                        className="flex justify-start items-center gap-2 w-fit pr-5  overflow-ellipsis truncate whitespace-nowrap max-w-[220px]"
                                                    >
                                                        <Globe width={20} />
                                                        <span>{item}</span>
                                                    </Link>
                                                )
                                            )}
                                    </span>
                                    {matchedUserData?.profile?.aboutMe && (
                                        <p className="mt-10  w-full text-sm mx-auto text-center  pl-1 my-1 leading-[1.6] text-gray-200 font-normal italic  ">
                                            &quot;{" "}
                                            {matchedUserData?.profile?.aboutMe}{" "}
                                            &quot;
                                        </p>
                                    )}
                                </span>
                            </div>
                        </blockquote>
                    </div>
                </div>

                <div
                    className="col-span-2  md:col-span-1 bg-opacity-50 flex-col px-2 justify-start items-start  w-full md:w-[40vw]  mx-auto max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 pr-8 py-3 "
                    style={{
                        background:
                            "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                    }}
                    // key={item.displayName + idx}
                >
                    <div className="w-full border-b-[1px] border-gray-700 py-2">
                        <p className="text-gray-400 font-semibold">
                            Skills and Languages
                        </p>
                        <div className="flex flex-wrap">
                            {matchedUserData?.profile?.skillTags.length > 0 &&
                                matchedUserData?.profile?.skillTags.map(
                                    (item: string, index: number) => (
                                        <span
                                            key={index}
                                            className="m-1 hover:bg-blue-200 text-xs font-semibold me-2 px-2.5 py-0.5 rounded  bg-gray-700  text-blue-400 border border-blue-400 inline-flex items-center justify-center"
                                        >
                                            {item}
                                        </span>
                                    )
                                )}
                        </div>
                    </div>
                    <div className="w-full border-b-[1px] border-gray-700 py-2">
                        <p className="text-gray-400 font-semibold">
                            Problems Solved (Total:&nbsp;
                            <span className="text-gray-200">
                                {
                                    matchedUserData?.submitStatsGlobal
                                        ?.acSubmissionNum?.[0]?.count
                                }
                            </span>
                            )
                        </p>
                        <div className="flex-col justify-center items-center grid grid-cols-2 ">
                            {matchedUserData?.languageProblemCount.map(
                                (item: any, index: number) => (
                                    <p
                                        className="flex gap-1 items-center  col-span-1"
                                        key={index}
                                    >
                                        <Dot
                                            width={20}
                                            className="  text-blue-500"
                                        />
                                        <span className="text-gray-400 font-semibold text-sm">
                                            {item?.languageName}: &nbsp;
                                        </span>
                                        <span className="text-gray-200">
                                            {item?.problemsSolved}
                                        </span>
                                    </p>
                                )
                            )}
                        </div>
                    </div>
                    <div className="w-full border-b-[1px] border-gray-700 py-2">
                        <p className="text-gray-400 font-semibold">
                            Community Stats
                        </p>
                        <div className="flex-col justify-center items-center grid grid-cols-2 ">
                            <p className="flex gap-1 items-center  col-span-1">
                                <Eye width={20} className="  text-blue-500" />
                                <span className="text-gray-400 font-semibold text-sm">
                                    Views{" "}
                                </span>
                                <span className="text-gray-200">
                                    {matchedUserData?.profile?.postViewCount >
                                    1000
                                        ? (
                                              matchedUserData?.profile
                                                  ?.postViewCount / 1000
                                          ).toFixed(1) + "K"
                                        : matchedUserData?.profile
                                              ?.postViewCount}
                                </span>
                            </p>
                            <p className="flex gap-1 items-center col-span-1">
                                <CheckSquare2
                                    width={20}
                                    className="  text-green-500"
                                />
                                <span className="text-gray-400 font-semibold text-sm">
                                    Solution
                                </span>
                                <span className="text-gray-200">
                                    {matchedUserData?.profile?.solutionCount >
                                    1000
                                        ? (
                                              matchedUserData?.profile
                                                  ?.solutionCount / 1000
                                          ).toFixed(1) + "K"
                                        : matchedUserData?.profile
                                              ?.solutionCount}
                                </span>
                            </p>
                            <p className="flex gap-1 items-center   sm:col-span-1">
                                <MessageSquareText
                                    width={20}
                                    className="  text-blue-500"
                                />
                                <span className="text-gray-400 font-semibold text-sm">
                                    Discuss
                                </span>
                                <span className="text-gray-200">
                                    {matchedUserData?.profile
                                        ?.categoryDiscussCount > 1000
                                        ? (
                                              matchedUserData?.profile
                                                  ?.categoryDiscussCount / 1000
                                          ).toFixed(1) + "K"
                                        : matchedUserData?.profile
                                              ?.categoryDiscussCount}
                                </span>
                            </p>
                            <p className="flex gap-1 items-center  sm:col-span-1">
                                <Star
                                    width={20}
                                    className="  text-orange-500"
                                />
                                <span className="text-gray-400 font-semibold text-sm">
                                    Reputation
                                </span>
                                <span className="text-gray-200">
                                    {matchedUserData?.profile?.reputation > 1000
                                        ? (
                                              matchedUserData?.profile
                                                  ?.reputation / 1000
                                          ).toFixed(1) + "K"
                                        : matchedUserData?.profile?.reputation}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserProfileCards;
