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
const image =
    "https://private-user-images.githubusercontent.com/85238910/304101926-4b644120-a425-41e8-9775-1c29dd3c282d.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MDc3NDQ2MDAsIm5iZiI6MTcwNzc0NDMwMCwicGF0aCI6Ii84NTIzODkxMC8zMDQxMDE5MjYtNGI2NDQxMjAtYTQyNS00MWU4LTk3NzUtMWMyOWRkM2MyODJkLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDAyMTIlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwMjEyVDEzMjUwMFomWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWUwM2RjYTFhNzQ2NzFmODI3Y2UxNjhkZjQzMjYzNDUwM2UxNmFiNmYzMjc2ZjAzNTFmNGJlODYwZmI4MWYzZjImWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.QtlMzut6U6dxwcY0jX0b1F3WGCUhSia2oz4LoN2Ih4Q";
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
