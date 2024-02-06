// pages/api/fetchUserData.ts

import { NextResponse } from "next/server";
import { userCheckQuery } from "@/app/lib/gqlQueries";

export async function POST(req, res, context) {
    try {
        const body = await req.json();
        const username = body.username;

        const combinedQuery = userCheckQuery(username);

        const response = await fetch(combinedQuery);

        const data = await response.json();

        if (data.errors) {
            return NextResponse.json({
                status: false,
                data: data.errors[0].message,
            });
        }

        return NextResponse.json({
            status: true,
            data: data.data.matchedUser,
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
