import { currentProfile } from "@/lib/current-profile";
import WriteArticle from "@/pagesfolder/WriteStory/WriteArticle";
import React from "react";

export default async function page() {
  const user = await currentProfile();
  return <WriteArticle user={user} />;
}
