"use client";

import useArticleStore from "@/store/useArticleStore";
import { useEffect } from "react";
import ArticleSavedCard from "./ArticleSavedCard";
import TopicRecommendation from "./Recommendations/TopicRecommendation";

function SideBarFeed({ currentUser, hotTopicsArr }: any) {
  const [savedArticle, setSavedArticle, setRecommendedTags] = useArticleStore(
    (state) => [
      state.savedArticle,
      state.setSavedArticle,
      state.setRecommendedTags,
    ]
  );
  useEffect(() => {
    setSavedArticle(currentUser?.savedArticles);
    setRecommendedTags(hotTopicsArr);
  }, []);
  return (
    <div className="p-2 space-y-10 h-full w-full">
      <TopicRecommendation heading="Hot Topics" />
      <h2 className="text-[#242424] font-semibold">Recently saved</h2>
      {savedArticle && savedArticle.length > 0 ? (
        savedArticle.map((item,index) => {
          return <ArticleSavedCard item={item} key={index}/>;
        })
      ) : (
        <p className="text-center">No saved stories</p>
      )}
      <p className="text-[12px] text-[#6B6B6B]">
        Help Status About Careers Blog Privacy Terms Text to speech Teams
      </p>
    </div>
  );
}

export default SideBarFeed;
