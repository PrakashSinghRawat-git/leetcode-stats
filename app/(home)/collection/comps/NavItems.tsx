import React from "react";
import Dialog from "./Dialog";
import DropDownHam from "../../../components/DropDownHam";
interface groupArrType {
    groupArr: string[];
    params: { group: string };
    views: number;
}

export default function NavItems({ groupArr, params, views }: groupArrType) {
    return (
        <div className="border-b-[1px] border-gray-700 my-1 py-2 flex justify-between">
            <Dialog groupArr={groupArr} params={params} />
            {/* <DropDownHam views={views} /> */}
        </div>
    );
}
