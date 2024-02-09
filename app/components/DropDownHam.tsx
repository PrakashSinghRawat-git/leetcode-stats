import { Github, Linkedin, Twitter, Globe } from "lucide-react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import Image from "next/image";

export default function DropdownMenuDemo({ views }: { views: number }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Image
                    src="/logo_psr.png"
                    width={40}
                    height={40}
                    alt="dev"
                    className="cursor-pointer hover:scale-105"
                ></Image>
            </DropdownMenuTrigger>
            <DropdownMenuContent
                className="w-56 bg-[#2B3A63] text-gray-200 bg-opacity-90 border-none z-999 cursor-pointer  "
                style={{
                    zIndex: 999,
                }}
            >
                <DropdownMenuLabel className="text-xs italic">
                    Hello! I made this...
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-gray-500" />
                <DropdownMenuGroup className="">
                    <DropdownMenuItem className="my-2">
                        <Link
                            href={
                                "https://www.linkedin.com/in/prakash-singh-rawat-a48b11254/"
                            }
                            target="_blank"
                            className="flex justify-start items-center gap-2 w-full hover:text-blue-500"
                        >
                            <Linkedin width={30} className="text-blue-500" />
                            <span>LinkedIn</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="my-2">
                        <Link
                            href={"https://github.com/PrakashSinghRawat-git"}
                            target="_blank"
                            className="flex justify-start items-center gap-2 w-full hover:text-blue-500"
                        >
                            <Github width={30} />
                            <span>Github</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="my-2">
                        <Link
                            href={"https://leetcode.com/kalki299/"}
                            target="_blank"
                            className="flex justify-start items-center gap-2 w-full hover:text-blue-500"
                        >
                            <Image
                                src="/leetcode.png"
                                width={25}
                                height={25}
                                alt="leetcode"
                            ></Image>
                            <span>Leetcode</span>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="my-2">
                        <Link
                            href={"https://prakash-rawat.vercel.app/"}
                            target="_blank"
                            className="flex justify-start items-center gap-2 w-full hover:text-blue-500"
                        >
                            <Globe width={30} className="text-blue-300" />
                            <span>Personal Site</span>
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="bg-gray-500" />
                <DropdownMenuGroup className="text-xs text-gray-500 ml-5">
                    <p>v-{views}</p>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
