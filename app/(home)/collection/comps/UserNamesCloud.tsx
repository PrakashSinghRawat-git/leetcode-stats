import React from "react";
import { ButtonsCard } from "@/app/components/ui/tailwindcss-button";
import { useRouter } from "next/navigation";

interface groupArrType {
    groupArr: string[];
}
const UserNamesCloud = ({ groupArr }: groupArrType) => {
    const router = useRouter();
    const handleOnClick = (user: string) => {
        const newTab = window.open(`/user/${user}`, "_blank");
        if (newTab) {
            newTab.focus();
        } else {
            console.error("Failed to open new tab");
        }
    };

    return (
        <div className="flex justify-evenly flex-wrap items-center mt-3">
            {groupArr.map((item: string, index: number) => (
                <ButtonsCard
                    key={index}
                    text={item}
                    handleOnClick={handleOnClick}
                />
            ))}
        </div>
    );
};

export default UserNamesCloud;
