"use client";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { calculateTime } from "@/lib/calculate-time";
import useArticleStore from "@/store/useArticleStore";
import { BookPlus, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

function ArticleCard({
  status,
  title,
  description,
  topic,
  articleImgUrl,
  $createdAt,
  $id
}: ArticleProps) {
  const [setDescription, setTitle, setImg] = useArticleStore((state) => [
    state.setDescription,
    state.setTitle,
    state.setImg,
  ]);

  const router = useRouter();
  const handleArticleEdit = (
    title: string,
    description: string,
    articleImgUrl: string,
    $id:string
  ) => {
    setTitle(title);
    setDescription(description);
    setImg(articleImgUrl);
    router.push(`/write-story/${$id}/edit`);
  };

  return (
    <div className="mt-5">
      {status !== "me" && (
        <div className="flex mt-10 items-center space-x-2  text-sm">
          <Avatar className="h-8 w-8">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <h2 className="text-[#4d4b4b]">Cherit.</h2>
          <p className="text-[#6B6B6B]">May 12</p>
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between space-x-5">
          <div className="flex flex-col space-y-2">
            <h2 className="font-bold text-[20px] ">{title}</h2>
            <p>{description}</p>
          </div>
          {articleImgUrl && (
            <Image
              src={articleImgUrl}
              alt="image"
              width={80}
              height={60}
              className="p-2"
            />
          )}
        </div>
        {status !== "me" && (
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
        )}
      </div>
      {status==="me" && <div className="text-[#6B6B6B] text-xs mt-3 flex items-center space-x-2">
        <p> Created {calculateTime($createdAt)} </p>
        <Button
          onClick={() => handleArticleEdit(title, description, articleImgUrl,$id)}
          variant="ghost"
        >
          Edit
        </Button>{" "}
      </div>}
    </div>
  );
}

export default ArticleCard;
