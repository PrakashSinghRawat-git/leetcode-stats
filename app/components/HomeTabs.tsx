"use client";
import Link from "next/link";
import { use, useEffect, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/app/components/ui/card";
import { Search } from "lucide-react";
import { DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Input } from "@/app/components/ui/input";
import { Label } from "@/app/components/ui/label";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/app/components/ui/tabs";
import { ArrowRightCircle, X } from "lucide-react";
import { Oval } from "react-loader-spinner";

import { checkGroup } from "@/app/lib/database-calls";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import globalStore from "@/app/store/globalStore";
// type GroupArrType = string[];
// import { GroupArrType } from "@/app/store/globalStore";

export default function TabsDemo({ active }: { active: string }) {
    const [userName, setUserName] = useState("");
    const [collectionName, setCollectionName] = useState("");
    const [member, setMember] = useState("");
    const { groupArr, setGroupArr } = globalStore();
    const [collectionNameStatus, setCollectionNameStatus] =
        useState<boolean>(true);

    const [isSearchingUserStarted, setIsSearchingUserStarted] =
        useState<boolean>(false);
    const router = useRouter();

    // useEffect(() => {
    //     console.log("groupArr is : ", groupArr);
    // }, [groupArr]);
    const handleVerifyAndAddUser = async () => {
        setIsSearchingUserStarted(true);
        if (member == "" || groupArr.includes(member)) {
            setMember("");
            setIsSearchingUserStarted(false);

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

        // console.log("data is : ", data);
        if (data?.status == false) {
            toast.error(data?.data);
            setIsSearchingUserStarted(false);

            return;
        }
        setGroupArr([...groupArr, member]);
        setMember("");
        setIsSearchingUserStarted(false);
    };

    const handleNavigateToComparison = () => {
        if (groupArr.length < 2) {
            toast.error("Please add atleast 2 users to compare");
            return;
        }
        router.push(`/collection/temp`);
    };

    const handleInputChange = async (e: any) => {
        try {
            // console.log("collection name", e.target.value);
            setCollectionName(e.target.value);
            const result = await checkGroup(e.target.value);
            // console.log("result:", result);
            setCollectionNameStatus(result);
        } catch (err) {
            console.error("Error checking group:", err);
        }
    };

    const handleCheckUser = async () => {
        if (userName == "") {
            return;
        }
        setIsSearchingUserStarted(true);
        const res = await fetch(`/api/checkIsUserValid`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username: userName }),
        });
        const data = await res.json();

        // console.log("data is : ", data);
        if (data?.status == false) {
            toast.error("User does not exists...");
            setIsSearchingUserStarted(false);

            return;
        }
        setIsSearchingUserStarted(false);

        router.push(`/user/${userName}`);
    };
    return (
        <Tabs
            defaultValue={active || "user"}
            className="w-[400px] bg-transparent"
        >
            <TabsList className="grid w-full grid-cols-2 bg-transparent  ">
                <TabsTrigger value="user">View</TabsTrigger>
                <TabsTrigger value="group">Compare</TabsTrigger>
            </TabsList>
            <TabsContent value="user" className="bg-transparent ">
                <Card className="bg-transparent text-gray-200 border-[1px] border-gray-700">
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                        <CardDescription>View Your Profile</CardDescription>
                    </CardHeader>
                    <CardContent className=" w-full relative   flex items-center my-auto bg-transparent">
                        <Input
                            id="name"
                            placeholder="Username"
                            className="py-[25px] text-[18px] w-full  text-gray-700  "
                            onChange={(e) => {
                                setUserName(e.target.value);
                            }}
                        />

                        {isSearchingUserStarted ? (
                            <div className="absolute text-gray-900  cursor-pointer top-[20%]  right-[8%] ">
                                <Oval
                                    visible={true}
                                    height="25"
                                    width="25"
                                    color="#4fa94d"
                                    ariaLabel="oval-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            </div>
                        ) : (
                            <button onClick={handleCheckUser}>
                                <ArrowRightCircle
                                    width={50}
                                    className="absolute text-gray-900  cursor-pointer top-[20%]  right-[5%] "
                                />
                            </button>
                        )}
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="group">
                <Card className="bg-transparent text-gray-200 border-[1px] border-gray-700">
                    <CardHeader>
                        <div className="flex justify-between items-center ">
                            <CardTitle className="w-[180px] text-xs mr-1 ">
                                Search Saved Collection
                            </CardTitle>
                            <div className="w-fit   relative">
                                <DebounceInput
                                    debounceTimeout={500}
                                    id="name"
                                    value={collectionName}
                                    placeholder={"search collection"}
                                    onChange={(e) => handleInputChange(e)}
                                    className={`flex ${
                                        collectionNameStatus === true
                                            ? "text-green-700"
                                            : "text-red-700"
                                    } text-sm   min-w-[100px] col-span-3    h-10 w-full rounded-md border border-input bg-background px-3 py-2   ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                                />

                                <Search
                                    strokeWidth={3}
                                    className={`absolute cursor-pointer  right-2 bottom-2 hover:scale-105 ${
                                        collectionNameStatus === true
                                            ? "text-green-500"
                                            : "text-red-500 disabled:cursor-not-allowed disabled:opacity-50 "
                                    }`}
                                    onClick={() => {
                                        if (collectionNameStatus === false) {
                                            toast.error(
                                                "this collection does not exists..."
                                            );
                                            return;
                                        }
                                        router.push(
                                            `/collection/${collectionName}`
                                        );
                                    }}
                                />
                            </div>
                        </div>
                        <DropdownMenuSeparator />
                        <p className="w-full text-center text-gray-400 font-extrabold">
                            OR
                        </p>
                        <CardDescription>
                            Add Correct Usernames to Compare
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="">
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
                                    className="text-gray-700"
                                />
                            </div>

                            <p
                                className="col-span-2 bg-blue-600 h-[40px] rounded-sm py-2 text-center mt-3 hover:bg-blue-700 text-gray-200 cursor-pointer"
                                onClick={handleVerifyAndAddUser}
                            >
                                {isSearchingUserStarted ? (
                                    <div className="w-full flex justify-center">
                                        <Oval
                                            visible={true}
                                            height="25"
                                            width="25"
                                            color="#4fa94d"
                                            ariaLabel="oval-loading"
                                            wrapperStyle={{}}
                                            wrapperClass=""
                                        />
                                    </div>
                                ) : (
                                    "Add"
                                )}
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
