"use client";
import useArticleStore from "@/store/useArticleStore";
import React, { useEffect, useState } from "react";
import ArticleCard from "./ArticleCard";
import InfiniteScroll from "react-infinite-scroll-component";
import { articleDisplayCount, articleFeedUpdateAnimationDelay } from "@/constants";
import { Loader } from "lucide-react";


function ArticleFeed({ articles, currentUser }: any) {
  const [setRecommendedTags] = useArticleStore((state) => [
    state.setRecommendedTags,
  ]);
  const [articlesDisplayCount, setArticlesDisplayCount] = useState(articleDisplayCount);
  const [hasMore, setHasMore] = useState(true);
  const [addedArticles, setAddedArticles] = useState(articles.slice(0, articleDisplayCount));
  const fetchMoreData = () => {
    if (articlesDisplayCount >= articles.length) {
      setHasMore(false);
      return;
    }
    setTimeout(() => {
      articles.slice(articlesDisplayCount, articlesDisplayCount + articleDisplayCount).map((item: ArticleProps, index: number) => {
        setAddedArticles((addedArticles: any) => [...addedArticles, item]);
      })
      setArticlesDisplayCount(articlesDisplayCount + articleDisplayCount);
    }, articleFeedUpdateAnimationDelay);
  }

  useEffect(() => {
    setRecommendedTags("");
  }, []);
  return (
    <>
      {addedArticles.length > 0 ? (
        <InfiniteScroll
          dataLength={addedArticles.length}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<p className="flex items-center justify-center h-[10vh]">
            <Loader className="w-6 h-6 animate-spin" />{" "}
          </p>}
          endMessage={
            <p style={{ textAlign: "center" }} className="mt-3 pb-0 p-2">
              <b>Uncover Hidden Gems Beyond This Point - More awaits in Recommendations and Search!</b>
            </p>
          }
        >
          {addedArticles.map((item: ArticleProps, index: number) => {
            return (

              <ArticleCard
                key={index}
                users={item?.users}
                status={item.status}
                title={item.title}
                description={item?.description}
                $createdAt={item.$createdAt}
                articleImgUrl={item.articleImgUrl}
                $id={item.$id}
                topic={item.topic}
                currentUser={currentUser}
              />
            );
          })}
        </InfiniteScroll>

      ) : (
        <div className="h-full w-full text-center mt-[50px]">
          No Articles to show
        </div>
      )}
    </>
  );
}

export default ArticleFeed;
