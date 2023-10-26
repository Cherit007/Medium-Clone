"use client";
import { database } from "@/appwriteConfig";
import { fetchArticles } from "@/controllers/fetchUserArticles";
import { calculateArticleReadTime } from "@/lib/calculate-read-time";
import { calculateTime } from "@/lib/calculate-time";
import useArticleStore from "@/store/useArticleStore";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { BookmarkPlus, BookPlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
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
import { useToast } from "../ui/use-toast";

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
    setRecommendedTags,
    setRecommendedArticle,
  ] = useArticleStore((state) => [
    state.setDescription,
    state.setTitle,
    state.setImg,
    state.setCurrentArticle,
    state.setSavedArticle,
    state.savedArticle,
    state.setUserArticles,
    state.setLoading,
    state.setRecommendedTags,
    state.setRecommendedArticle,
  ]);

  const router = useRouter();
  const { toast } = useToast();
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
    toast({
      variant: "destructive",
      title: "Saved this article",
      className: "bg-[green] text-white rounded-[20px]",
    });
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
      toast({
        className: "bg-[red] text-white rounded-[20px]",
        variant: "default",
        title: "Removed this article",
      });
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

  const handleArticleDelete = async ($id: string, title: string) => {
    console.log($id, title);
    try {
      const payload = {
        id: $id,
        title: title,
      };
      await axios.post("/api/delete-article", payload);
      await fetchArticles(setLoading, setUserArticles);
    } catch (e) {
      console.log(e);
    }
  };

  const handleArticleClick = () => {
    setCurrentArticle({
      status,
      title,
      description,
      topic,
      articleImgUrl,
      $createdAt,
      $id,
      users,
      currentUser,
    });
    router.push(`/${users?.name}/${$id}`);
  };

  return (
    <div
      className={`mt-3 cursor-pointer ${
        status === "recommended" && "h-[350px] w-[300px] ml-[50px] mx-auto"
      }`}
    >
      {articleImgUrl && status === "recommended" && (
        <Image
          src={articleImgUrl}
          alt="image"
          className="max-w-400 w-400 mb-3"
          width={300}
          height={50}
        />
      )}
      {status !== "me" && (
        <div
          className={`flex  mt-10 ${
            status === "recommended" && "mt-0"
          } items-center space-x-2 text-sm`}
        >
          {users?.profile_img_url && (
            <Image
              alt="logo"
              src={users?.profile_img_url}
              width={30}
              height={30}
              className="rounded-full"
            />
          )}
          <h2 className="text-[#4d4b4b]"> {users?.name}.</h2>
          <p className="text-[#6B6B6B]">{calculateTime($createdAt)}</p>
        </div>
      )}
      <div className="space-y-2">
        <div className="flex items-center justify-between space-x-5">
            <div
              className="flex flex-col space-y-2 flex-1"
              onClick={handleArticleClick}
            >
              <h2 className="font-bold text-[20px] ">{title}</h2>
              <p>
                {status === "recommended"
                  ? description.slice(0, 150)
                  : description.slice(0, 400)}
                ....
              </p>
            </div>{" "}
          {articleImgUrl && status !== "recommended" && (
            <Image src={articleImgUrl} alt="image" width={80} height={50} />
          )}
        </div>
        {status !== "me" && (
          <div className="flex justify-between w-full items-center">
            <div className="flex items-center w-full space-x-3">
              <p className="bg-[#F2F2F2] rounded-[15px] text-[#242424] text-sm p-2">
                {topic}
              </p>
              <p className="text-[#6B6B6B] text-sm">
                {calculateArticleReadTime(description)} read
              </p>
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
                      onClick={() => handleArticleDelete($id, title)}
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
