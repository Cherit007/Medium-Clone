"use client";
import Navbar from "@/components/Navbar/Navbar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import useArticleStore from "@/store/useArticleStore";
import { Image as Img, Loader2, Lock, PlusCircle, X } from "lucide-react";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { currentProfile } from "@/lib/current-profile";

interface AIResultsProps {
  point: string;
  content: string;
}

function WriteArticle({
  editedDescription,
  editedTitle,
  editedArticleImgUrl,
  user,
}: EditedArticleProps) {
  const [uploadButton, setUploadButton] = useState<boolean>(false);
  const [aiLoading, setAiLoading] = useState<boolean>(false);
  const [aiResults, setAiResults] = useState<AIResultsProps[]>();
  const pathname = useParams();
  const [isMember, setIsMember] = useState(false);
  const [
    img,
    setImg,
    title,
    description,
    setImgUrl,
    setDescription,
    setTitle,
    setTitleValidation,
    titleValidation,
  ] = useArticleStore((state: ArticleState) => [
    state.img,
    state.setImg,
    state.title,
    state.description,
    state.setImgUrl,
    state.setDescription,
    state.setTitle,
    state.setTitleValidation,
    state.titleValidation,
  ]);

  useEffect(() => {
    if (pathname?.articleId) {
      setTitle(editedTitle);
      setDescription(editedDescription);
      setImg(editedArticleImgUrl);
    }
    if (user.is_member === true) {
      setIsMember(true);
    }
  }, []);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setImgUrl(e.target.files[0]);
      setImg(URL.createObjectURL(e.target.files[0]));
      setUploadButton(false);
    }
  };

  const handleTitleValidation = (val: string) => {
    const words = val.split(" ");
    if (words.length > 10) setTitleValidation(true);
    else setTitleValidation(false);
  };
  const handleAskAiNotMember = () => {
    window.location.href = "/plans";
  };
  const handleAskAi = async () => {
    if (title) {
      const payload = {
        text: title,
      };
      setAiLoading(true);
      await fetch("/api/ask-ai", {
        method: "POST",
        body: JSON.stringify(payload),
      }).then(async (res) => {
        const resp = await res.json();
        setAiResults(resp.data);
      });
      setAiLoading(false);
    }
  };

  return (
    <>
      <Navbar buttonText={"Publish"} status="writeArticle" />
      <div className="w-full flex flex-col md:flex-row justify-between mx-auto md:max-w-7xl mt-[30px] gap-20">
        <div className="h-full w-full md:[70%] col-span-7">
          {img && (
            <div className="flex justify-center">
              <X
                onClick={() => setImg("")}
                className="w-6 h-6 bg-[red] rounded-full text-white relative left-[110px] -top-2 cursor-pointer"
              />
              <Image src={img} alt="img" width={100} height={100} />{" "}
            </div>
          )}
          <div className="w-full flex items-center space-x-5">
            {title ? (
              <label htmlFor="title" className="text-[#0000008A]">
                Title
              </label>
            ) : (
              <Popover onOpenChange={() => setUploadButton(true)}>
                <PopoverTrigger asChild>
                  <PlusCircle className="w-8 text-[#0000008A] h-8 cursor-pointer" />
                </PopoverTrigger>
                <PopoverContent
                  onBlur={() => setUploadButton(false)}
                  side="left"
                  className="flex outline-none shadow-none border-none"
                >
                  <label htmlFor="file-input">
                    <Img className="w-8 text-green-700 h-8 cursor-pointer border-2 rounded-full border-green-700" />
                  </label>
                  <input
                    onChange={(e) => handleImageUpload(e)}
                    id="file-input"
                    className="hidden"
                    type="file"
                  />
                </PopoverContent>
              </Popover>
            )}
            {/* <div className="outline-none border-none w-full font-write text-[40px] focus-within:border-l-2 pl-2">
            <div  ref={quillRef} /> */}
            <textarea
              value={title}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                handleTitleValidation(e.target.value);
                setTitle(e.target.value);
              }}
              id="title"
              className="outline-none w-full font-write text-[40px] focus-within:border-l-2 pl-2"
              placeholder={!uploadButton ? "Title" : ""}
            ></textarea>
            {/* </div> */}
            {titleValidation && (
              <p className="text-[red] font-semibold">
                *Title cannot be more than 10 words
              </p>
            )}
          </div>
          <div className="w-full flex space-x-5 cursor-pointer">
            {!description ? (
              <PlusCircle className="w-8 text-[#0000008A]  h-8" />
            ) : (
              <div className="w-8"></div>
            )}
            <textarea
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              className="outline-none h-[60vh]  w-full font-write text-[25px] focus-within:border-l-2 pl-2"
              placeholder="Tell your story..."
            ></textarea>
          </div>
        </div>
        <div className="bg-[#F2F2F2] w-[80%] mx-auto md:w-[38%] flex flex-auto p-3 justify-center  rounded-[20px]">
          <div className="flex flex-col text-semibold justify-around px-[25px]">
            <div className="flex text-center">
              <img
                src="/askai.gif"
                className="w-10 h-10 rounded-[20px] mx-auto"
              />
              <p> Ask Chat-GPT to organize your article</p>
            </div>
            <ul className="mt-5">
              {aiLoading ? (
                <>
                  <Loader2 className="h-6 w-6 animate-spin text-[#4092b3] mx-auto" />
                  <p className="text-center text-[#6B6B6B] mt-4">
                    This may take a moment.
                  </p>
                </>
              ) : !!aiResults ? (
                <Accordion
                  type="single"
                  collapsible
                  className="w-full max-h-[400px] overflow-auto"
                >
                  {aiResults.map((point, index) => {
                    return (
                      <AccordionItem key={index} value={point?.point}>
                        <AccordionTrigger className="text-start no-underline">
                          {point?.point}
                        </AccordionTrigger>
                        <AccordionContent>
                          {point?.content.substring(4)}
                        </AccordionContent>
                      </AccordionItem>
                    );
                  })}
                </Accordion>
              ) : (
                <ul className="text-[#6B6B6B] list-disc">
                  <li>
                    You can say 'help' at any time if you need assistance.
                  </li>
                  <li>
                    Enter the title of the article you'd like me to summarize
                  </li>
                </ul>
              )}
            </ul>
            <div className="flex flex-col">
              {!aiLoading && (
                <p className="text-center mx-auto font-bold max-w-[200px] break-words">
                  {title}
                </p>
              )}
              {isMember && (
                <Button
                  onClick={handleAskAi}
                  variant="outline"
                  className="rounded-full mt-5"
                  disabled={aiLoading || title.length < 2}
                >
                  {aiLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Ask
                </Button>
              )}

              {!isMember && (
                <Button
                  onClick={handleAskAiNotMember}
                  variant="outline"
                  className="rounded-full mt-5"
                  disabled={aiLoading || title.length < 2}
                >
                  {aiLoading && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  <span className="mr-2">Ask</span> <Lock />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteArticle;
