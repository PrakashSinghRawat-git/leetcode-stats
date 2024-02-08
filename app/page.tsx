import HomeTabs from "@/app/components/HomeTabs";
export default function Home() {
    return (
        <main className="flex flex-col justify-start items-center w-full min-h-screen">
            <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                <span className="text-[#fbbf24]">LeetStats</span>
            </p>
            <HomeTabs />
        </main>
    );
}
