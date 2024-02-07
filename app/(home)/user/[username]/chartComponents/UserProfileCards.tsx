import React from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, GraduationCap, Github, Linkedin, Twitter } from "lucide-react";
const UserProfileCards = ({ matchedUserData }: any) => {
    return (
        <section className="w-full">
            <div className="w-full md:w-[90%] grid grid-cols-2 mx-auto justify-center gap-5 m-5">
                <div
                    className="bg-opacity-50 flex justify-between items-start  md:w-[40vw]  mx-auto max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-3 "
                    style={{
                        background:
                            "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                    }}
                    // key={item.displayName + idx}
                >
                    <div className="gap-5">
                        <Image
                            src={matchedUserData?.profile?.userAvatar}
                            width={80}
                            height={80}
                            alt="profile-pic"
                            className="mx-auto w-fit-content w-[80px] bg-red-500"
                        ></Image>

                        <div className="relative z-20 mt-6 flex flex-row items-start">
                            <span className="flex flex-col">
                                <span className=" text-sm  text-center leading-[1.6] text-gray-200 font-normal">
                                    {matchedUserData?.profile?.realName}{" "}
                                </span>

                                <span className=" text-xs  text-center leading-[1.6] text-gray-400 font-normal">
                                    {matchedUserData?.username}
                                </span>
                            </span>
                        </div>
                    </div>
                    <blockquote className=" ">
                        <div
                            aria-hidden="true"
                            className="user-select-none -z-1 pointer-events-none absolute -left-0.5  h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                        ></div>

                        <div className="relative z-20 mt-1 flex flex-row items-start justify-start ">
                            <span className="flex flex-col">
                                <span className=" text-sm  text-start my-1 leading-[1.6] text-gray-200 font-normal italic">
                                    " {matchedUserData?.profile?.aboutMe} "
                                </span>

                                <span className=" text-sm gap-1 text-center leading-[1.6] text-gray-400 font-normal">
                                    {matchedUserData?.profile?.countryName && (
                                        <p className="flex justify-start items-center gap-2  ">
                                            <MapPin width={20} />
                                            <span>
                                                {
                                                    matchedUserData?.profile
                                                        ?.countryName
                                                }
                                            </span>
                                        </p>
                                    )}
                                    {matchedUserData?.profile?.school && (
                                        <p className="flex justify-start items-center gap-2">
                                            <GraduationCap width={20} />
                                            <span className="text-xs">
                                                {
                                                    matchedUserData?.profile
                                                        ?.school
                                                }
                                            </span>
                                        </p>
                                    )}
                                    {matchedUserData?.githubUrl && (
                                        <Link
                                            href={matchedUserData?.githubUrl}
                                            target="_blank"
                                            className="flex justify-start items-center gap-2"
                                        >
                                            <Github width={20} />
                                            <span>Github</span>
                                        </Link>
                                    )}
                                    {matchedUserData?.linkedinUrl && (
                                        <Link
                                            href={matchedUserData?.linkedinUrl}
                                            target="_blank"
                                            className="flex justify-start items-center gap-2"
                                        >
                                            <Linkedin width={20} />
                                            <span>Linkedin</span>
                                        </Link>
                                    )}
                                    {matchedUserData?.twitterUrl && (
                                        <Link
                                            href={matchedUserData?.twitterUrl}
                                            target="_blank"
                                            className="flex justify-start items-center gap-2"
                                        >
                                            <Twitter width={20} />
                                            <span>Twitter</span>
                                        </Link>
                                    )}
                                </span>
                            </span>
                        </div>
                    </blockquote>
                </div>
                <div
                    className="bg-opacity-40   md: w-[40vw]  mx-auto max-w-full relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6 "
                    style={{
                        background:
                            "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                    }}
                    // key={item.displayName + idx}
                >
                    <blockquote className="">
                        <div
                            aria-hidden="true"
                            className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                        ></div>

                        <div className="relative z-20 mt-6 flex flex-row items-center">
                            <span className="flex flex-col gap-1">
                                <span className=" text-sm  text-center leading-[1.6] text-gray-400 font-normal">
                                    {/* {item.displayName} */}
                                    hello
                                </span>
                            </span>
                        </div>
                    </blockquote>
                </div>
            </div>
        </section>
    );
};

export default UserProfileCards;
