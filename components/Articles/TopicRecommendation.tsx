"use client";
import { database } from "@/appwriteConfig";
import useArticleStore from "@/store/useArticleStore";
import axios from "axios";
import React, { useEffect } from "react";

function TopicRecommendation({
  description,
  heading,
  user,
}: {
  description: string;
  heading: string;
  user: any;
}) {
  const [setRecommendedTags, recommendedTags, currentArticle] = useArticleStore(
    (state) => [
      state.setRecommendedTags,
      state.recommendedTags,
      state.currentArticle,
    ]
  );
  useEffect(() => {
    const fetchHashTags = async () => {
      if (description) {
        const payload = {
          text: description,
        };
        const { data } = await axios.post("/api/hashtag", payload);
        const hasTags = data?.data?.Tags;
        setRecommendedTags(hasTags);
        if (currentArticle && user?.subTopics.length === 0) {
          database.updateDocument(
            "651d2c31d4f6223e24e2",
            "651d2c5fca0e679e84a7",
            currentArticle?.$id,
            {
              subTopics: hasTags?.map((i: string) => i.slice(1)),
            }
          );
        }
      }
    };
    fetchHashTags();
  }, [description]);
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
