import { Avatar, AvatarImage } from "@/components/ui/avatar";
import React from "react";

function ArticleSavedCard() {
  return (
    <div>
      <h2 className="text-[#242424] font-semibold">Recently saved</h2>
      <div className="flex flex-col space-y-2 mt-5">
        <div className="flex space-x-2 items-center">
          <Avatar className="h-6 w-6">
            <AvatarImage src="https://github.com/shadcn.png" />
          </Avatar>
          <h3 className="font-medium	text-sm">P. Rehan in Dev Genius</h3>
        </div>
        <h2 className="font-semibold">
          9 Tips for Writing Clean, Fast, And Maintainable React Code
        </h2>
        <p className="text-[#6B6B6B] text-sm">Mar 30 . 13 min read</p>
      </div>
    </div>
  );
}

export default ArticleSavedCard;
