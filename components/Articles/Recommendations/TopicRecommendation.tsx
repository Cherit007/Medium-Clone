"use client";
import useArticleStore from "@/store/useArticleStore";

function TopicRecommendation({ heading }: { heading: string }) {
  const [recommendedTags] = useArticleStore((state) => [state.recommendedTags]);

  return (
    <div className="flex flex-col mt-8 space-y-5">
      <h2 className="font-semibold">{heading}</h2>
      <div className="flex flex-wrap gap-5 ">
        {!!recommendedTags &&
          recommendedTags.map((item: any, index: number) => (
            <p
              className="bg-[#F2F2F2] rounded-[15px] text-[#242424] text-sm p-2"
              key={index}
            >
              {item}
            </p>
          ))}
      </div>
    </div>
  );
}

export default TopicRecommendation;
