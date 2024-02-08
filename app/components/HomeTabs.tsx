"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/app/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/components/ui/tabs";
import { ArrowRightCircle } from "lucide-react";

import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import globalStore from "@/app/store/globalStore";
// type GroupArrType = string[];
import { GroupArrType } from "@/app/store/globalStore";

export default function TabsDemo() {
    const [userName, setUserName] = useState("");
    // const [groupName, setGroupName] = useState("");
    const [member, setMember] = useState("");
    const { groupArr, setGroupArr } = globalStore();

    const router = useRouter();

    useEffect(() => {
        console.log("groupArr is : ", groupArr);
    }, [groupArr]);
    const handleVerifyAndAddUser = async () => {
        if (member == "" || groupArr.includes(member)) {
            setMember("");
            return;
        }
        const res = await fetch(`/api/checkIsUserValid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: member }),
        });
        const data = await res.json();

        console.log("data is : ", data);
        if (data?.status == false) {
            toast.error(data?.data);

            return;
        }
        setGroupArr([...groupArr, member]);
        setMember("");
    };

    const handleNavigateToComparison = () => {
        if (groupArr.length == 0) {
            toast.error("Please add group name and members to compare");
            return;
        }
        router.push(`/collection/temp`);
    };

    return (
        <Tabs defaultValue="user" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="user">View</TabsTrigger>
                <TabsTrigger value="group">Compare</TabsTrigger>
            </TabsList>
            <TabsContent value="user">
                <Card>
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>View Your Profile</CardDescription>
                    </CardHeader>
                    <CardContent className=" w-full relative   flex items-center my-auto">
                        <Input
                            id="name"
                            placeholder="Username"
                            className="py-[25px] text-[18px] w-full   "
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />
                        <Link href={`/user/${userName}`}>
                            <ArrowRightCircle
                                width={50}
                                className="absolute text-gray-900  cursor-pointer top-[20%]  right-[5%] "
                            />
                        </Link>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="group">
                <Card>
                    <CardHeader>
                        <CardDescription>
                            Add Correct Usernames to Compare
                        </CardDescription>
                        {/* <div className="flex justify-between items-center ">
                            <CardTitle className="w-[180px] text-xl  ">
                                Create Group
                            </CardTitle>
                            <div className="w-fit   ">
                                <Input
                                    id="current"
                                    type="text"
                                    onChange={(e) => {
                                        setGroupName(e.target.value);
                                    }}
                                    className="font-bold text-lg"
                                    value={groupName}
                                    placeholder="Group Name"
                                />
                            </div>
                        </div> */}
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <div className="space-y-1 grid grid-cols-10 items-end gap-2   "></div>
                        <div className="space-y-1 grid grid-cols-10 items-end gap-2   ">
                            <div className="w-full col-span-8">
                                <Label htmlFor="current">Username</Label>
                                <Input
                                    id="current"
                                    type="text"
                                    onChange={(e) => {
                                        setMember(e.target.value);
                                    }}
                                    value={member}
                                />
                            </div>
                            <p
                                className="col-span-2 bg-blue-600 h-[40px] rounded-sm py-2 text-center mt-3 hover:bg-blue-700 text-gray-200 cursor-pointer"
                                onClick={handleVerifyAndAddUser}
                            >
                                add
                            </p>
                        </div>
                        <div>
                            {groupArr.map((item: string, index: number) => (
                                <span
                                    key={index}
                                    id="badge-dismiss-default"
                                    className="m-1 inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded dark:bg-blue-900 dark:text-blue-300"
                                >
                                    {item}
                                    <button
                                        type="button"
                                        className="inline-flex items-center p-1 ms-2 text-sm text-blue-400 bg-transparent rounded-sm hover:bg-blue-200 hover:text-blue-900 dark:hover:bg-blue-800 dark:hover:text-blue-300"
                                        data-dismiss-target="#badge-dismiss-default"
                                        aria-label="Remove"
                                        onClick={() => {
                                            setGroupArr(
                                                groupArr.filter(
                                                    (_: any, i: number) =>
                                                        i != index
                                                )
                                            );
                                        }}
                                    >
                                        <svg
                                            className="w-2 h-2"
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 14 14"
                                        >
                                            <path
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                            />
                                        </svg>
                                        <span className="sr-only">
                                            Remove badge
                                        </span>
                                    </button>
                                </span>
                            ))}
                        </div>
                    </CardContent>
                    <CardFooter>
                        <button
                            className="col-span-2 px-2 bg-green-600 h-[40px] rounded-sm py-2 text-center mt-3 hover:bg-green-700 text-gray-200 cursor-pointer"
                            onClick={handleNavigateToComparison}
                        >
                            Compare
                        </button>
                    </CardFooter>
                </Card>
            </TabsContent>
        </Tabs>
    );
}
