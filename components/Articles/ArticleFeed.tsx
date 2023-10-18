"use client";
import useArticleStore from "@/store/useArticleStore";
import React, { useEffect } from "react";
import ArticleCard from "./ArticleCard";

function ArticleFeed({ articles, currentUser }: any) {
  const [setRecommendedTags] = useArticleStore((state) => [
    state.setRecommendedTags,
  ]);
  useEffect(() => {
    setRecommendedTags("");
  }, []);
  return (
    <>
      {articles.length > 0 ? (
        articles.map((item: ArticleProps, index: number) => {
          return (
            <ArticleCard
              key={index}
              users={item?.users}
              status={item.status}
              title={item.title}
              description={item.description}
              $createdAt={item.$createdAt}
              articleImgUrl={item.articleImgUrl}
              $id={item.$id}
              topic={item.topic}
              currentUser={currentUser}
            />
          );
        })
      ) : (
        <div className="h-full w-full text-center mt-[50px]">
          No Articles to show
        </div>
      )}
    </>
  );
}

export default ArticleFeed;
