import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Home } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });
import Link from "next/link";

const title = "LeetStat - All LeetCode stats at one place";
const description =
    " Leetstat provides all the LeetCode stats in one place with filters, interactive charts, and more. Compare your stats with friends or view anyone's stats by entering their LeetCode username.";
const url = "https://leetstat.vercel.app/";
const image = "/metaImage.png";
const keywords = [
    "leetcode",
    "coding",
    "competetive programming",
    "algorithms",
    "data structures",
    "leetcode stats",
    "leetcode profile",
    "stats",
    "charts",
    "compare",
    "friends",
    "username",
];

export const metadata: Metadata = {
    title: title,
    description: description,
    keywords: keywords,

    openGraph: {
        title: title,
        description: description,
        url: url,
        siteName: "LeetStat",
        images: [
            {
                url: image,
                width: 800,
                height: 600,
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: title,
        description: description,
        images: [image],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${inter.className}`}>
                <div className=" w-full bg-black   bg-dot-white/[0.2]   relative flex items-center justify-center">
                    <Link href="/">
                        <Home
                            size={28}
                            strokeWidth={2}
                            absoluteStrokeWidth
                            className="text-gray-300 absolute top-5 right-5  z-50 hover:scale-105 cursor-pointer"
                        />
                    </Link>
                    <div className="  w-full bg-black    bg-dot-white/[0.2]  relative flex items-center justify-center">
                        <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black  [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

                        {children}

                        <Analytics />
                        <SpeedInsights />
                    </div>
                    <ToastContainer
                        position="bottom-right"
                        autoClose={2000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                        theme="colored"
                    />
                </div>
            </body>
            {/* </NextThemeProvider> */}
        </html>
    );
}
