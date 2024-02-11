import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog";
import { X, Check, Copy } from "lucide-react";
import { checkGroup, createGroup } from "@/app/lib/database-calls";
import { Share2 } from "lucide-react";
import { Oval } from "react-loader-spinner";
// import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DebounceInput } from "react-debounce-input";
import { toast } from "react-toastify";

import { Input } from "@/components/ui/input";
import globalStore from "@/app/store/globalStore";
interface groupArrType {
    groupArr: string[];
    params: { group: string };
}
export default function DialogDemo({ groupArr, params }: groupArrType) {
    const [collectionName, setCollectionName] = useState(params.group || "");
    const [collectionNameStatus, setCollectionNameStatus] =
        useState<boolean>(true);
    const [isCreatingStarted, setIsCreatingStarted] = useState<boolean>(false);

    const { isCollectionCreated, setIsCollectionCreated } = globalStore();

    // Debounce the onChange event with a delay of 1000 milliseconds

    const handleInputChange = async (e: any) => {
        try {
            console.log("collection name", e.target.value);
            setCollectionName(e.target.value);
            const result = await checkGroup(e.target.value);
            console.log("result:", result);
            setCollectionNameStatus(!result);
        } catch (err) {
            console.error("Error checking group:", err);
        }
    };

    const handleCreateCollection = async () => {
        try {
            setIsCreatingStarted(true);
            const result = await checkGroup(collectionName);
            console.log("result:", result);
            if (result) {
                toast.error("this collection already exists...");
                setIsCreatingStarted(false);

                return;
            } else {
                const result = await createGroup(collectionName, groupArr);
                if (result) {
                    setIsCollectionCreated(true);
                    // setCollectionName("");
                    toast.success(
                        collectionName + " collection created successfully..."
                    );
                }
                setIsCreatingStarted(false);
            }
        } catch (err) {
            setIsCreatingStarted(false);

            console.error("Error creating collection:", err);
        }
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="text-[#090C14]  flex justify-between gap-3"
                >
                    {isCollectionCreated ? (
                        <>
                            <Share2
                                strokeWidth={1.5}
                                width={20}
                                className={`hover:text-blue-500`}
                            />
                            <span className={`hover:text-blue-500`}>
                                {" "}
                                Share
                            </span>
                        </>
                    ) : (
                        "Save Group"
                    )}
                </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px] text-gray-200 bg-[#080B13] bg-opacity-50">
                {isCollectionCreated ? (
                    <DialogHeader>
                        <DialogTitle>
                            <span>Share link</span>
                        </DialogTitle>
                        <DialogDescription>
                            Anyone who has this link will be able to view this.
                        </DialogDescription>
                    </DialogHeader>
                ) : (
                    <DialogHeader>
                        <DialogTitle>Save Collection</DialogTitle>
                        <DialogDescription className="text-gray-400">
                            Give a unique name for your collection. You can use
                            this collection in the future.
                        </DialogDescription>
                    </DialogHeader>
                )}
                {isCollectionCreated ? (
                    <div className="flex items-center space-x-2">
                        <div className="grid flex-1 gap-2">
                            <Label
                                htmlFor="link"
                                className="sr-only text-gray-700"
                            >
                                Link
                            </Label>
                            <Input
                                id="link"
                                defaultValue={`leetstat.vercel.app/collection/${collectionName}`}
                                className="text-gray-900 font-semibold"
                                readOnly
                            />
                        </div>
                        <Button
                            type="submit"
                            size="sm"
                            className="px-3 bg-gray- "
                        >
                            <span className="sr-only">Copy</span>
                            {/* <CopyIcon className="h-4 w-4" /> */}
                            <Copy
                                // color="#000000"
                                className="text-gray-200  "
                                strokeWidth={2}
                                onClick={() => {
                                    navigator.clipboard.writeText(
                                        `leetstat.vercel.app/collection/${collectionName}`
                                    );
                                    toast.success("copied to clipboard");
                                }}
                            />
                        </Button>
                    </div>
                ) : (
                    <div className="grid gap-4 py-4 w-full">
                        <div className="grid w-full relative grid-cols-4 items-center gap-4  ">
                            <Label
                                htmlFor="name"
                                className="text-right col-span-1"
                            >
                                Collection Name
                            </Label>
                            <DebounceInput
                                debounceTimeout={500}
                                id="name"
                                value={collectionName}
                                onChange={(e) => handleInputChange(e)}
                                className={`flex ${
                                    collectionNameStatus === true
                                        ? "text-green-700"
                                        : "text-red-700"
                                } text-lg min-w-[100px] col-span-3 font-bold  h-10 w-full rounded-md border border-input bg-background px-3 py-2   ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50`}
                            />
                            {collectionNameStatus == false ? (
                                <X className="absolute right-2 text-red-500 font-bold" />
                            ) : (
                                <Check className="absolute right-2 text-green-500 font-bold" />
                            )}
                        </div>
                    </div>
                )}
                {isCollectionCreated ? (
                    <DialogFooter className="sm:justify-start">
                        <DialogClose asChild>
                            <Button type="button" variant="secondary">
                                Close
                            </Button>
                        </DialogClose>
                    </DialogFooter>
                ) : (
                    <DialogFooter>
                        <Button
                            onClick={handleCreateCollection}
                            className="flex justify-center items-center gap-2"
                        >
                            {isCreatingStarted && (
                                <Oval
                                    visible={true}
                                    height="25"
                                    width="25"
                                    color="#4fa94d"
                                    ariaLabel="oval-loading"
                                    wrapperStyle={{}}
                                    wrapperClass=""
                                />
                            )}
                            <span>Create</span>
                        </Button>
                    </DialogFooter>
                )}
            </DialogContent>
        </Dialog>
    );
}
