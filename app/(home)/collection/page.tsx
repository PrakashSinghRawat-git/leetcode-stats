"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
    const router = useRouter();
    useEffect(() => {
        router.push("/");
    }, []);

    return <div>page</div>;
};

export default Page;