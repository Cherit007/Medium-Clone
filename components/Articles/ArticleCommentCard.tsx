import Image from "next/image";
import React from "react";
import { Separator } from "../ui/separator";
import { Models } from "appwrite";
import { calculateTime } from "@/lib/calculate-time";

function ArticleCommentCard({
  item,
}: {
  item: CommentProps | Models.Document;
}) {
  return (
    <>
      <div className="flex flex-col mt-2 space-y-5 items-start w-full flex-1">
        <div className="flex w-full space-x-3">
          <Image alt="user" src={"/Logo.jpeg"} width={50} height={50} />
          <div className="flex flex-col justify-center space-y-1">
            <p className="text-sm">Cheirt</p>
            <p className="text-sm">{calculateTime(item?.$createdAt)}</p>
          </div>
        </div>
        <p className="text-start ml-3">{item?.comment}</p>
      </div>
      <Separator
        orientation="horizontal"
        className="w-full h-[2px] mt-5 bg-[#6B6B6B]/20"
      />
    </>
  );
}

export default ArticleCommentCard;
