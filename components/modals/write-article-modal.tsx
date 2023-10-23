"use client";
import { topics } from "@/constants";
import useArticleStore from "@/store/useArticleStore";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogHeader } from "../ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storage } from "@/appwriteConfig";
import { ID } from "appwrite";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchArticles } from "@/controllers/fetchUserArticles";
import { ScrollArea } from "../ui/scroll-area";
import { encryptText } from "@/lib/encrypt-decrypt";
import { useToast } from "../ui/use-toast";

const formSchema = z.object({
  topic: z.string(),
});

export const WriteArticleModal = () => {
  const [
    setImg,
    title,
    setUserArticles,
    topic,
    imgUrl,
    setTopic,
    description,
    setDescription,
    setTitle,
    isOpen,
    onClose,
    type,
    setLoading,
    img,
  ] = useArticleStore((state) => [
    state.setImg,
    state.title,
    state.setUserArticles,
    state.topic,
    state.imgUrl,
    state.setTopic,
    state.description,
    state.setDescription,
    state.setTitle,
    state.isOpen,
    state.onClose,
    state.type,
    state.setLoading,
    state.img,
  ]);

  const router = useRouter();
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      topic: "Arts",
    },
  });

  const onSubmit = async () => {
    toast({
      variant: "destructive",
      title: "Published this article",
      className: "bg-[green] text-white",
    });
    let articleImgUrl;
    if (imgUrl) {
      articleImgUrl = await storage.createFile(
        "6522a1f72adc01958f6c",
        ID.unique(),
        imgUrl
      );
    } else articleImgUrl = "";
    // const encryptedDescription = encryptText(description, "secretKey");
    const payload = {
      topic,
      articleImgUrl,
      title,
      description
    };
    await fetch("/api/write-article", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    }).then(async (res) => {
      const { data } = await res.json();
      setUserArticles(data);
      setTitle("");
      setDescription("");
      setImg("");
    });
    onClose();
    await fetchArticles(setLoading, setUserArticles);
    router.push("/me/stories");
  };
  const isLoading = form.formState.isSubmitting;

  const isModelOpen = isOpen && type === "writeArticle";

  return (
    <Dialog open={isModelOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white overflow-hidden p-10 min-w-[70%] min-h-[70%]">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex space-x-10">
            <div className="flex flex-col space-y-5">
              <h2 className="text-[#000000C2] text-[25px]">Story Preview</h2>
              <textarea
                value={title}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setTitle(e.target.value)
                }
                className="outline-none w-full font-write text-[40px] focus-within:border-l-2 pl-2"
              ></textarea>
              <textarea
                value={description}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                  setDescription(e.target.value)
                }
                className="outline-none w-full font-write text-[40px] focus-within:border-l-2 pl-2"
              ></textarea>
            </div>
            <div className="flex flex-col space-y-5">
              <h2 className="text-[#000000E6]">Publishing to: C</h2>
              <p className="text-[#000000E6]">
                Add a topic so readers know what your story is about
              </p>
              <Select onValueChange={setTopic}>
                <SelectTrigger>
                  <SelectValue className="" placeholder={"Arts"}></SelectValue>
                </SelectTrigger>
                <SelectContent className="bg-white h-full">
                  <ScrollArea className="h-72 w-48 rounded-md">
                    {topics.map((item: UserTopics, index: number) => (
                      <SelectItem
                        value={item.topic}
                        key={index}
                        className="cursor-pointer"
                      >
                        {item.topic}
                      </SelectItem>
                    ))}
                  </ScrollArea>
                </SelectContent>
              </Select>
              <Button
                type="submit"
                className="bg-[#1A8917] text-white rounded-full p-2 text-sm hover:bg-[#399c36] disabled:bg-[gray]"
              >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Publish now
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
