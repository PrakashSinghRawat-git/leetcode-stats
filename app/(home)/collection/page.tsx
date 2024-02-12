import HomeTabs from "@/app/components/HomeTabs";

export default function Home() {
    return (
        <section className="max-w-screen overflow-hidden max-h-screen">
            <div className="mt-[150px] sm:mt-[100px] flex flex-col justify-start items-center w-full min-h-screen ">
                <p className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
                    <span className="text-[#fbbf24]">LeetStats</span>
                </p>
                <div
                    className="w-full"
                    style={{
                        background:
                            "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                    }}
                >
                    <HomeTabs active={"group"} />
                </div>
            </div>
        </section>
    );
}
