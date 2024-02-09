"use client";

import { cn } from "@/app/lib/utils";
import React, { useEffect, useState } from "react";
import Image from "next/image";
export const InfiniteMovingCards = ({
    items,
    direction = "left",
    speed = "slow",
    className,
}: {
    items: any[];
    direction?: "left" | "right";
    speed?: "fast" | "normal" | "slow";

    className?: string;
}) => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const scrollerRef = React.useRef<HTMLUListElement>(null);

    // console.log("badges items are: ", items);
    useEffect(() => {
        addAnimation();
    }, []);
    const [start, setStart] = useState(false);
    function addAnimation() {
        if (containerRef.current && scrollerRef.current) {
            getDirection();
            getSpeed();
            setStart(true);
        }
    }
    const getDirection = () => {
        if (containerRef.current) {
            if (direction === "left") {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "forwards"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-direction",
                    "reverse"
                );
            }
        }
    };
    const getSpeed = () => {
        if (containerRef.current) {
            if (speed === "fast") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "20s"
                );
            } else if (speed === "normal") {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "40s"
                );
            } else {
                containerRef.current.style.setProperty(
                    "--animation-duration",
                    "80s"
                );
            }
        }
    };
    return (
        <div
            ref={containerRef}
            className={cn(
                "scroller w-full relative z-20  max-w-7xl overflow-hidden  [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]",
                className
            )}
        >
            <ul
                ref={scrollerRef}
                className={cn(
                    "flex min-w-full shrink-0 gap-4 py-4 w-max flex-nowrap justify-center items-center",
                    start && "animate-scroll ",
                    "hover:[animation-play-state:paused]"
                )}
            >
                {items.map((item, idx) => {
                    // console.log(`items number: ${idx + 1}`, item);
                    return (
                        <li
                            className="w-full max-w-[200px] relative rounded-2xl border border-b-0 flex-shrink-0 border-slate-700 px-8 py-6"
                            style={{
                                background:
                                    "linear-gradient(180deg, var(--slate-800), var(--slate-900)",
                            }}
                            key={item.displayName + idx}
                        >
                            <Image
                                src={item?.medal?.config?.iconGif}
                                width={100}
                                height={100}
                                alt={item.displayName}
                                className="mx-auto"
                            ></Image>
                            <blockquote className="">
                                <div
                                    aria-hidden="true"
                                    className="user-select-none -z-1 pointer-events-none absolute -left-0.5 -top-0.5 h-[calc(100%_+_4px)] w-[calc(100%_+_4px)]"
                                ></div>

                                <div className="relative z-20 mt-6 flex flex-row items-center">
                                    <span className="flex flex-col gap-1">
                                        <span className=" text-sm  text-center leading-[1.6] text-gray-400 font-normal">
                                            {item.displayName}
                                        </span>
                                    </span>
                                </div>
                            </blockquote>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};
