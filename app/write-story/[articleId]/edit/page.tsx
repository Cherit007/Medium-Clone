import { database, storage } from "@/appwriteConfig";
import WriteArticle from "@/pages/WriteStory/WriteArticle";
import { Query } from "appwrite";
import React from "react";

interface Props {
  params: {
    articleId: string;
  };
}

const fetchEditedArticle = async (params: Props) => {
  const data = await database.listDocuments(
    "651d2c31d4f6223e24e2",
    "651d2c5fca0e679e84a7",
    [Query.equal("$id", params.params.articleId)]
  );

  const articles = data.documents;

  const fetchImgUrls = (urlId: string, index: number) => {
    if (urlId) {
      const imgs = storage.getFilePreview("6522a1f72adc01958f6c", urlId);
      articles[index].articleImgUrl = imgs.href;
    } else articles[index].articleImgUrl = "";
  };

  articles.map((item, index) => {
    fetchImgUrls(item.articleImgUrl, index);
  });
  return articles;
};

export default async function page(params: Props) {
  const articles = await fetchEditedArticle(params);

  return (
    <WriteArticle
      editedDescription={articles[0].description}
      editedTitle={articles[0].title}
      editedArticleImgUrl={articles[0].articleImgUrl}
    />
  );
}
