import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { BookPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function ArticleCard() {
  const handleClick = () => {
    console.log("Article clicked");
  }
  return (
    <div>
      <div className="flex mt-10 items-center space-x-2  text-sm">
        <Avatar className="h-8 w-8">
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
        <h2 className="text-[#4d4b4b]">Cherit.</h2>
        <p className="text-[#6B6B6B]">May 12</p>
      </div>
      <div>
        <div className="flex items-center justify-between space-x-5">
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-[20px] ">
              NodeJS 20 is HERE! 10 Features that will blow your mind 🤯
            </h2>
            <p>
              Introduction: Welcome to the Node.js 20 Party! 🎉 Fellow
              developers, prepare to be amazed! Node.js 20 has arrived, ushering
              in a new era of
            </p>
          </div>
          <Image
            src={
              "https://miro.medium.com/v2/resize:fill:224:224/1*UytexOPZKxpINEd_IBAf9A.png"
            }
            alt="image"
            width={120}
            height={120}
          />
        </div>
        <div className="flex justify-between w-[75%] items-center">
          <div className="flex items-center space-x-3">
            <Link
              href={"/"}
              className="bg-[#F2F2F2] rounded-[15px] text-[#242424] text-sm p-2"
            >
              Node
            </Link>
            <p className="text-[#6B6B6B] text-sm">5 mins read</p>
          </div>
          <BookPlus className="h-6 w-6 cursor-pointer text-[#6B6B6B]/70" />
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
