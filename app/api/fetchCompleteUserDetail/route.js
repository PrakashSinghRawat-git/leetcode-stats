// pages/api/fetchUserData.ts

import { NextResponse } from "next/server";
import { completeUserInfoQuery } from "@/app/lib/gqlQueries";

export async function POST(req, res) {
    try {
        const body = await req.json();
        const username = body.username;
        let year = body.year;
        if (!year) {
            const date = new Date();
            year = date.getFullYear();
        }

        const combinedQuery = completeUserInfoQuery(username, year);
        // console.log("combinedQuery", combinedQuery);

        const response = await fetch(combinedQuery);

        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        return NextResponse.json({
            data: data,
        });
    } catch (error) {
        console.error("Error fetching data:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 },
            { data: error }
        );
    }
}
