import { database } from "@/appwriteConfig";
import WriteArticle from "@/pages/WriteStory/WriteArticle";
import { Query } from "appwrite";
import React from "react";

interface Props {
  params: {
    articleId: string;
  };
}

export default async function page({ params }: Props) {
  const { documents } = await database.listDocuments(
    "651d2c31d4f6223e24e2",
    "651d2c5fca0e679e84a7",
    [Query.equal("$id", params.articleId)]
  );

  return (
    <WriteArticle
      editedDescription={documents[0].description}
      editedTitle={documents[0].title}
      editedArticleImgUrl={documents[0].articleImgUrl}
    />
  );
}
