"use client";

import { useEffect, useState } from "react";
import ArticleDeleteModal from "../modals/article-delete-modal";
import UserAccountDeleteModal from "../modals/user-account-delete";
import { WriteArticleModal } from "../modals/write-article-modal";
import { WriteEditArticleModal } from "../modals/write-edit-article-modal";

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);
  if (!isMounted) return null;

  return (
    <>
      <WriteArticleModal />
      <WriteEditArticleModal />
      <ArticleDeleteModal />
      <UserAccountDeleteModal />
    </>
  );
};
