import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { topics } from "@/constants";
import ArticleSavedCard from "./ArticleSavedCard";

function SideBarFeed() {
  return (
    <div className="p-10 space-y-10 fixed w-[27%]">
      <div>
        <h2 className="text-[#242424] font-semibold">Recommended topics</h2>
        <div className="flex flex-wrap gap-5 mt-4 ">
          {topics.map((item) => (
            <p
              className="bg-[#F2F2F2] rounded-[15px] text-[#242424] text-sm p-2"
              key={item}
            >
              {item}
            </p>
          ))}
        </div>
      </div>
      <ArticleSavedCard />
      <ArticleSavedCard />
      <ArticleSavedCard />
      <ArticleSavedCard />
      <ArticleSavedCard />
    </div>
  );
}

export default SideBarFeed;
