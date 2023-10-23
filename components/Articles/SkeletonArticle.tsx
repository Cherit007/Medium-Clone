import React from "react";
import { Skeleton } from "../ui/skeleton";

function SkeletonArticle() {
  const skeletons = ["1", "2", "3", "4"];
  return (
    <div className="flex flex-wrap w-full gap-y-5 mt-10 ">
      {skeletons.map((item) => (
        <div key={item} className="flex items-center h-[300px] rounded-[30px] w-[300px] mx-auto space-x-4 bg-[#e3dfdf]">
          <Skeleton className="h-10 w-10 rounded-full bg-[#F2F2F2]" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[200px] bg-[#F2F2F2]" />
            <Skeleton className="h-4 w-[200px] bg-[#F2F2F2]" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default SkeletonArticle;
