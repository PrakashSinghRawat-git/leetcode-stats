"use client";

import { useEffect, useState } from "react";
import ProblemSolvedByCategory from "./chartComponents/ProblemSolvedByCategory";

export default function Page({ params }: { params: { username: string } }) {
    const [userData, setUserData] = useState<any>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const objectWithData = {
                    username: params.username,
                    year: 2023,
                };
                // console.log("calling api with objectWithData", objectWithData);
                const res = await fetch("/api/fetchCompleteUserDetail", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(objectWithData),
                });

                const data = await res.json();
                console.log("userdata is : ", data?.data.data);

                setUserData(data?.data?.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="w-screen">
            My Post: {params.username}
            <ProblemSolvedByCategory userData={userData} />
        </div>
    );
}
