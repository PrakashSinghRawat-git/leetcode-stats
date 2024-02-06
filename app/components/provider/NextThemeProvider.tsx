"use client";
import { useEffect, useState } from "react";
import globalStore from "@/app/store/globalStore";

import { ThemeProvider } from "next-themes";

const NextThemeProvider = ({ children }: { children: React.ReactNode }) => {
    // const [mounted, setMounted] = useState(false);

    // useEffect(() => {
    //     setMounted(true);
    // }, []);

    // if (!mounted) {
    //     return null;
    // }
    return <ThemeProvider>{children}</ThemeProvider>;
};
export default NextThemeProvider;
