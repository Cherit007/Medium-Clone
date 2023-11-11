"use client";
import { database } from "@/appwriteConfig";
import axios from "axios";

export const fetchHashTags = async (
  description: string,
  setRecommendedTags: any,
  currentUser: ArticleProps,
  $id: string,
  setLoading: any
) => {
  setLoading(true);
  const payload = {
    text: description,
  };
  const { data } = await axios.post("/api/hashtag", payload);
  const hasTags = data?.data?.Tags;
  setRecommendedTags(hasTags);
  if (!currentUser?.subTopics) {
    database.updateDocument(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      $id,
      {
        subTopics: hasTags?.map((i: string) => i.slice(1)),
      }
    );
  }
  setLoading(false);
};
