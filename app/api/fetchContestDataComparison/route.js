// pages/api/fetchUserData.ts

import { NextResponse } from "next/server";
import { userContestHistoryForComparisonQuery } from "@/app/lib/gqlQueries";

export async function POST(req, res) {
    try {
        const body = await req.json();
        const usernames = body.usernames; // Assuming usernames is an array of usernames
        // console.log("usernames", usernames);

        const userDataPromises = usernames.map(async (username) => {
            try {
                const combinedQuery =
                    userContestHistoryForComparisonQuery(username);
                // console.log("combinedQuery", combinedQuery);

                const response = await fetch(combinedQuery);

                const userRes = await response.json();

                if (userRes.errors) {
                    console.log(`User ${username} does not exist`);
                    console.log("errors", userRes);
                    return null; // Return null for non-existent users
                }

                return userRes.data;
            } catch (error) {
                console.error(`Error fetching data for ${username}:`, error);

                return null;
            }
        });

        const userDataResults = await Promise.all(userDataPromises);

        // Filter out null values (failed data fetches)
        const filteredUserData = userDataResults.filter((data) => data != null);

        return NextResponse.json({
            data: filteredUserData,
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
