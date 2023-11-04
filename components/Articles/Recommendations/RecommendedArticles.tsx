"use client";
import { fetchRecommdedArticles } from "@/controllers/fetchRecommendedArticles";
import { decryptText } from "@/lib/encrypt-decrypt";
import useArticleStore from "@/store/useArticleStore";
import { useEffect, useRef } from "react";
import ArticleCard from "../ArticleCard";
import SkeletonArticle from "../SkeletonArticle";

function RecommendedArticles({ currentUser }: { currentUser: any }) {
  const [currentArticle, recommendedArticles, loading] = useArticleStore(
    (state) => [state.currentArticle, state.recommendedArticles, state.loading]
  );
  const callApi = useRef(true);

  // useEffect(() => {
  //   try {
  //     const fetchData = async () => {
  //       if (currentArticle?.title && callApi.current) {
  //         callApi.current = false;
  //         await fetchRecommdedArticles(
  //           currentArticle?.title,
  //           setRecommendedArticle,
  //           setLoading
  //         );
  //       }
  //     };
  //     fetchData();
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }, [currentArticle]);

  console.log(recommendedArticles);

  return (
    <div className="mt-[80px] h-full flex flex-col w-full items-center flex-1 ">
      <h1 className="font-semibold mb-2 text-[25px]">
        Recommended from MindScribe
      </h1>
      <div className="flex flex-wrap justify-center max-w-4xl gap-y-5 flex-1 mx-auto w-full">
        {recommendedArticles.length > 0 ? (
          recommendedArticles.map((item: ArticleProps, index: number) => {
            if (item?.$id === currentArticle?.$id) return null;
            if (!item?.$id) return null;
            return (
              <ArticleCard
                key={index}
                topic={item?.topic}
                articleImgUrl={item?.articleImgUrl}
                status="recommended"
                title={item?.title}
                // description={decryptText(item?.description, "secretKey")}
                description={item?.description}
                $createdAt={item?.$createdAt}
                $id={item?.$id}
                users={item?.users}
                currentUser={currentUser}
                articleRating={item?.articleRating}
                comments={item?.comments}
              />
            );
          })
        ) : loading && recommendedArticles.length === 0 ? (
          <SkeletonArticle />
        ) : (
          <p>No recommendations found</p>
        )}
      </div>
    </div>
  );
}

export default RecommendedArticles;
