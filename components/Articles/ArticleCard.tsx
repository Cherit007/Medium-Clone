"use client";
import { database } from "@/appwriteConfig";
import { fetchArticles } from "@/controllers/fetchUserArticles";
import { calculateTime } from "@/lib/calculate-time";
import useArticleStore from "@/store/useArticleStore";
import { DialogClose } from "@radix-ui/react-dialog";
import { BookmarkPlus, BookPlus } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

function ArticleCard({
  status,
  title,
  description,
  topic,
  articleImgUrl,
  $createdAt,
  $id,
  users,
  currentUser,
}: ArticleProps) {
  const [
    setDescription,
    setTitle,
    setImg,
    setCurrentArticle,
    setSavedArticle,
    savedArticle,
    setUserArticles,
    setLoading,
  ] = useArticleStore((state) => [
    state.setDescription,
    state.setTitle,
    state.setImg,
    state.setCurrentArticle,
    state.setSavedArticle,
    state.savedArticle,
    state.setUserArticles,
    state.setLoading,
  ]);

  const router = useRouter();
  const isSavedArticle = savedArticle?.find((i) => i?.$id === ($id as any));
  const handleArticleEdit = (
    title: string,
    description: string,
    articleImgUrl: string,
    $id: string
  ) => {
    setTitle(title);
    setDescription(description);
    setImg(articleImgUrl);
    router.push(`/write-story/${$id}/edit`);
  };

  const handleSavedArticle = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: ArticleProps
  ) => {
    e.stopPropagation();
    if (!isSavedArticle) {
      setSavedArticle([...savedArticle, item]);
      await database.updateDocument(
        "651d2c31d4f6223e24e2",
        "65219b9e7c62b9078824",
        currentUser?.$id as string,
        {
          savedArticles: [...(currentUser?.savedArticles || []), item?.$id],
        }
      );
    } else {
      const newArr = savedArticle;
      const index = newArr.findIndex((i) => i?.$id === item?.$id);
      newArr.splice(index, 1);
      setSavedArticle(newArr);
      await database.updateDocument(
        "651d2c31d4f6223e24e2",
        "65219b9e7c62b9078824",
        currentUser?.$id as string,
        {
          savedArticles: newArr.map((article) => article?.$id),
        }
      );
    }
  };

  const handleArticleDelete = async ($id: string) => {
    await database.deleteDocument(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      $id
    );
    await fetchArticles(setLoading, setUserArticles);
  };

  return (
    <div className="mt-3 cursor-pointer">
      {status !== "me" && (
        <div className="flex mt-10 items-center space-x-2 text-sm">
          <Image
            src={users?.profile_img_url}
            width={30}
            height={30}
            className="rounded-full"
            alt="logo"
          />
          <h2 className="text-[#4d4b4b]"> {users?.name}.</h2>
          <p className="text-[#6B6B6B]">{calculateTime($createdAt)}</p>
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between space-x-5">
          <div
            className="flex flex-col space-y-2"
            onClick={() => {
              setCurrentArticle({
                status,
                title,
                description,
                topic,
                articleImgUrl,
                $createdAt,
                $id,
                users,
              });
              router.push(`/${users?.name}/${$id}`);
            }}
          >
            <h2 className="font-bold text-[20px] ">{title}</h2>
            <p>{description.slice(0, 400)}....</p>
          </div>
          {articleImgUrl && (
            <Image src={articleImgUrl} alt="image" width={80} height={50} />
          )}
        </div>
        {status !== "me" && (
          <div className="flex justify-between w-[75%] items-center">
            <div className="flex items-center space-x-3">
              <Link
                href={"/"}
                className="bg-[#F2F2F2] rounded-[15px] text-[#242424] text-sm p-2"
              >
                {topic}
              </Link>
              <p className="text-[#6B6B6B] text-sm">5 mins read</p>
            </div>

            <BookmarkPlus
              onClick={(e) => {
                handleSavedArticle(e, {
                  status,
                  title,
                  description,
                  topic,
                  articleImgUrl,
                  $createdAt,
                  $id,
                  users,
                });
              }}
              className={`h-6 w-6 cursor-pointer text-[#6B6B6B]/70 ${
                isSavedArticle && "fill-[#6B6B6B]"
              }`}
            />
          </div>
        )}
      </div>
      {status === "me" && (
        <div className="text-[#6B6B6B] text-xs mt-3 flex items-center justify-between space-x-2">
          <div className="flex items-center">
            {" "}
            <p> Created {calculateTime($createdAt)} </p>
            <Button
              onClick={(e) => {
                e.stopPropagation();
                handleArticleEdit(title, description, articleImgUrl, $id);
              }}
              variant="ghost"
            >
              Edit
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="ghost">Delete</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[600px] bg-white">
                <DialogHeader>
                  <DialogTitle className="text-center">
                    Delete Article
                  </DialogTitle>
                  <DialogDescription className="text-center">
                    Deletion is not reversible, and the story will be completely
                    deleted.
                  </DialogDescription>
                  <div className="text-center space-x-5">
                    <DialogClose asChild>
                      <Button variant="outline" className="rounded-[20px]">
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button
                      onClick={() => handleArticleDelete($id)}
                      variant="outline"
                      className="bg-[#C94A4A] text-white rounded-[20px] hover:bg-[#C94A4A] hover:text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
          <p className="bg-[#F2F2F2] rounded-[15px] text-[#242424] text-sm p-2">
            {topic}
          </p>
        </div>
      )}
      <Separator
        orientation="horizontal"
        className="w-full h-[2px] mt-6 bg-[#6B6B6B]/20"
      />
    </div>
  );
}

export default ArticleCard;
