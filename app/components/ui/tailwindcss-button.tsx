"use client";
import React from "react";
import { cn } from "@/app/lib/utils";

export const ButtonsCard = ({
    text,
    handleOnClick,
}: {
    text: string;
    handleOnClick?: (item: string) => void;
}) => {
    return (
        <button
            onClick={() => handleOnClick && handleOnClick(text)}
            className="inline-flex h-10  animate-shimmer items-center justify-center rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] bg-[length:200%_100%] px-3 font-medium text-slate-400 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
            {text}
        </button>
    );
};
