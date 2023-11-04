"use client";
import { database } from "@/appwriteConfig";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { v4 as uuidv4 } from "uuid";
import useArticleStore from "@/store/useArticleStore";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import ArticleCommentCard from "../Articles/ArticleCommentCard";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { Loader2 } from "lucide-react";
import { Models, Query } from "appwrite";
import axios from "axios";
import { fetchCurrentArticle } from "@/controllers/fetchCurrentArticle";

function CommentSheet() {
  const [
    isOpen,
    onClose,
    type,
    currentArticle,
    data,
    setAudioDataLocation,
    audioDataAvailable,
    audioDataLocation,
    setAudioDataAvailable,
    setCurrentArticle,
    setRecommendedArticle
  ] = useArticleStore((state) => [
    state.isOpen,
    state.onClose,
    state.type,
    state.currentArticle,
    state.data,
    state.setAudioDataLocation,
    state.audioDataAvailable,
    state.audioDataLocation,
    state.setAudioDataAvailable,
    state.setCurrentArticle,
    state.setRecommendedArticle
  ]);

  const [commentData, setCommentData] = useState<string>("");
  const [isMember, setIsMember] = useState(false);
  const [comments, setComments] = useState<CommentProps[] | Models.Document[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);

  const fetchComments = async () => {
    if (currentArticle?.$id) {
      const data = await database.listDocuments(
        "651d2c31d4f6223e24e2",
        "653f47c5f252a9caf9f5",
        [
          Query.equal("articleId", currentArticle?.$id),
          Query.orderDesc("$createdAt"),
        ]
      );
      setComments(data?.documents);
    }
  };
  useEffect(() => {
    fetchComments();
  }, [data]);

  const isSheetOpen = isOpen && type === "commentArticle";
  const callApi = useRef(true);

  const handleArticleComment = async () => {
    if (commentData && currentArticle?.$id && data?.userId) {
      const uid = uuidv4();
      setLoading(true);
      const payload = {
        uid: uid,
        articleId: currentArticle?.$id,
        comment: commentData,
        articles: currentArticle?.$id,
        userId: data?.userId,
        rating: currentArticle?.articleRating ?? 0,
      };
      await axios.post("/api/sentiment", payload);
      await fetchCurrentArticle(
        callApi,
        setLoading,
        currentArticle?.$id,
        setAudioDataLocation,
        setAudioDataAvailable,
        setCurrentArticle,
        setIsMember,
        setRecommendedArticle
      );
      await fetchComments();
      setCommentData("");
      setLoading(false);
    }
  };

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={onClose}>
        <SheetContent className="bg-white overflow-auto">
          <SheetHeader>Comments</SheetHeader>
          <div className="mt-5 flex flex-col gap-y-5 justify-start">
            <div className="flex items-center">
              <Image alt="user" src={"/Logo.jpeg"} width={50} height={50} />
              <p>{data?.name}</p>
            </div>
            <textarea
              value={commentData}
              onChange={(e) => setCommentData(e.target.value)}
              className="outline-none  border-2 shadow-lg w-full text-[30px] p-1"
            ></textarea>
            <div className="flex justify-end">
              <Button
                disabled={loading}
                onClick={handleArticleComment}
                className="bg-[#1A8917] cursor-pointer text-white rounded-full p-2 text-sm hover:bg-[#399c36]"
              >
                {loading && <Loader2 className="w-4 h-4 animate-spin mr-3" />}
                Respond
              </Button>
            </div>
            <Separator
              orientation="horizontal"
              className="w-full h-[2px] mt-1 bg-[#6B6B6B]/20"
            />
          </div>

          <div className="flex flex-col">
            {comments && comments?.length > 0 ? (
              comments.map((item,index) => {
                return <ArticleCommentCard item={item} key={index} />;
              })
            ) : (
              <p className="text-center mt-6">No comments</p>
            )}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}

export default CommentSheet;
