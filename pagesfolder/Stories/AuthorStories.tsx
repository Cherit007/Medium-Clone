"use client";
import ArticleCard from "@/components/Articles/ArticleCard";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import { fetchArticles } from "@/controllers/fetchUserArticles";
import useArticleStore from "@/store/useArticleStore";
import { Loader } from "lucide-react";
import Link from "next/link";
import React, { useEffect } from "react";

function AuthorStories() {
  const [setUserArticles, userArticles, loading, setLoading, recommendedTags] =
    useArticleStore((state) => [
      state.setUserArticles,
      state.userArticles,
      state.loading,
      state.setLoading,
      state.recommendedTags,
    ]);
  useEffect(() => {
    fetchArticles(setLoading, setUserArticles);
  }, []);
  return (
    <>
      {loading ? (
        <p className="flex items-center justify-center h-[60vh]">
          <Loader className="w-6 h-6 animate-spin" />{" "}
        </p>
      ) : (
        <div className="mt-10">
          <div className="flex items-center justify-between font-semibold">
            <h1 className="text-[40px]">Your stories</h1>
            <Link href={"/write-story"} prefetch>
              {" "}
              <Button className="bg-[#1A8917] text-white rounded-full p-2 text-sm hover:bg-[#399c36] disabled:bg-[gray]">
                Write a story
              </Button>
            </Link>
          </div>
          {/* <div className="flex items-center h-[50vh] justify-center"> */}
          {userArticles && userArticles?.length > 0 ? (
            userArticles.map((item: ArticleProps) => {
              return (
                <div className="border-b-2 border-gray-100 mb-2">
                  <ArticleCard
                    status="me"
                    title={item.title}
                    description={item.description}
                    topic={item.topic}
                    articleImgUrl={item.articleImgUrl}
                    $createdAt={item.$createdAt}
                    articleRating={item?.articleRating}
                    $id={item.$id}
                    comments={item?.comments}
                    users={item?.users}
                  />
                </div>
              );
            })
          ) : (
            <p className="text-center font-semibold">No stories yet</p>
          )}
          {/* </div> */}
        </div>
      )}
    </>
  );
}

export default AuthorStories;
