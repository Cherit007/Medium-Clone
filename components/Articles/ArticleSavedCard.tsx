import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { calculateTime } from "@/lib/calculate-time";
import { useRouter } from "next/navigation";
import React from "react";

function ArticleSavedCard({ item }: { item: ArticleProps }) {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push(`${item?.users?.name}/${item?.$id}`)}
      className="flex flex-col space-y-2 mt-5 p-1 mb-5 cursor-pointer"
    >
      <div className="flex space-x-2 items-center">
        <Avatar className="h-6 w-6">
          <AvatarImage src={item?.users?.profile_img_url} />
        </Avatar>
        <h3 className="font-medium	text-sm">{item?.users?.name}</h3>
      </div>
      <h2 className="font-semibold">{item?.title}</h2>
      <p className="text-[#6B6B6B] text-sm">
        {calculateTime(item?.$createdAt)} . 13 min read
      </p>
    </div>
  );
}

export default ArticleSavedCard;
