"use client";

import { useEffect, useState } from "react";
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
      <WriteEditArticleModal/>
    </>
  );
};
