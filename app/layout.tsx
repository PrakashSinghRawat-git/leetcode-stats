import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { Home } from "lucide-react";
const inter = Inter({ subsets: ["latin"] });

import Head from "next/head";
import Link from "next/link";
import {
    title,
    description,
    url,
    image,
    keywords,
} from "@/app/lib/metadataInfo";
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
                width: 300,
                height: 200,
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
            <Head>
                <script
                    async
                    src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3979558884312761"
                    crossOrigin="anonymous"
                ></script>
            </Head>
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
