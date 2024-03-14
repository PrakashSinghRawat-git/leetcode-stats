// pages/api/fetchUserData.ts

import { NextResponse } from "next/server";
import { usersSubmissionForComparisonQuery } from "@/app/lib/gqlQueries";
import { calculateTimePeriod } from "@/app/lib/functions";
import { periodLimitsForProblemSolved as limits } from "@/app/lib/constants/data";

export async function POST(req, res) {
    try {
        const body = await req.json();
        const usernames = body.usernames; // Assuming usernames is an array of usernames
        const period = body.period;

        const { periodStartTimestamp, periodEndTimestamp } =
            calculateTimePeriod(period);

        // console.log("period: ", period);
        // console.log("limits: ", limits[period]);
        // console.log("periodStartTimestamp: ", periodStartTimestamp);
        // console.log("periodEndTimestamp: ", periodEndTimestamp);

        const userDataPromises = usernames.map(async (username) => {
            try {
                const combinedQuery = usersSubmissionForComparisonQuery(
                    username,
                    limits[period] // Default limit is set to this year
                );

                const response = await fetch(combinedQuery);
                const userRes = await response.json();

                if (userRes.errors) {
                    console.log(
                        `Error fetching data for ${username} `,
                        userRes.errors
                    );
                    return null; // Return null for non-existent users
                }

                return {
                    ...userRes.data,
                    recentAcSubmissionList:
                        userRes.data.recentAcSubmissionList.filter(
                            (submission) => {
                                const submissionTimestamp = parseInt(
                                    submission.timestamp
                                );
                                return (
                                    submissionTimestamp >=
                                        periodStartTimestamp &&
                                    submissionTimestamp <= periodEndTimestamp
                                );
                            }
                        ).length,
                };
            } catch (error) {
                console.error(
                    `Error fetching submission data for ${username}:`,
                    error
                );

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
