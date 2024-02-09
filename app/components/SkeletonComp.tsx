import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface skeletopPropTypes {
    count?: number;
    circle?: boolean;
    width?: number;
    height?: number;
}

const SkeletonComp = ({
    count = 1,
    circle = false,
    width = 200,
    height = 100,
}: skeletopPropTypes) => {
    return (
        <div>
            {" "}
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
                <p>
                    <Skeleton
                        count={count}
                        circle={circle}
                        width={width}
                        height={height}
                    />
                </p>
            </SkeletonTheme>
        </div>
    );
};

export default SkeletonComp;
