"use client";
import { useEffect } from "react";
import HomeTabs from "@/app/components/HomeTabs";

import { categorizeTimestamps } from "@/app/lib/functions";
export default function Home() {
    useEffect(() => {
        const categorizedTimestamps = categorizeTimestamps();
        console.log("categorizedTimestamps page: ", categorizedTimestamps);
    }, []);
    return (
        <section className="max-w-screen overflow-hidden max-h-screen">
            <div className="mt-[200px] sm:mt-[100px] flex flex-col justify-start items-center w-full min-h-screen ">
                <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                    <span className="text-[#fbbf24]">LeetStats</span>
                </p>
                <HomeTabs />
            </div>
        </section>
    );
}
