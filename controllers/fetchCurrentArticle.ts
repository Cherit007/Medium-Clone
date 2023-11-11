import { database, storage } from "@/appwriteConfig";
import { Query } from "appwrite";
import { MutableRefObject } from "react";
import { fetchRecommdedArticles } from "./fetchRecommendedArticles";

export const fetchCurrentArticle = async (
  callApi: MutableRefObject<boolean>,
  setLoading: any,
  articleId: string,
  setAudioDataLocation: any,
  setAudioDataAvailable: any,
  setCurrentArticle: any,
  setIsMember: any,
  setRecommendedArticle: any
) => {
  if (callApi.current) {
    callApi.current = false;
    setLoading(true);

    const res = await database.listDocuments(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      [Query.equal("$id", articleId)]
    );
    if (res.documents) {
      let articles = res.documents[0];
      if (articles?.articleImgUrl) {
        const imgs = storage.getFilePreview(
          "6522a1f72adc01958f6c",
          articles?.articleImgUrl
        );
        articles.articleImgUrl = imgs.href;
      } else if(articles) articles.articleImgUrl = "";

      if (articles?.audioUrl) {
        setAudioDataLocation(articles?.audioUrl);
        setAudioDataAvailable(true);
      }
      else setAudioDataAvailable(false); 
      setCurrentArticle(articles);
      fetchRecommdedArticles(
        articles?.title,
        setRecommendedArticle,
        setLoading
      );
      setLoading(false);
    }
  }
};
