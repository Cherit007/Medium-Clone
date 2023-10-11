"use client";
import Navbar from "@/components/Navbar/Navbar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Image from "next/image";
import useArticleStore from "@/store/useArticleStore";
import { Atom, Image as Img, PlusCircle, X } from "lucide-react";
import { impPoints } from "@/constants";
import { z } from "zod";
import { ChangeEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams } from "next/navigation";

const formSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  imgUrl: z.string().min(1).optional(),
});
function WriteArticle({
  editedDescription,
  editedTitle,
  editedArticleImgUrl,
}: EditedArticleProps) {
  const [uploadButton, setUploadButton] = useState<boolean>(false);
  const pathname = useParams();
  const [
    img,
    setImg,
    title,
    imgUrl,
    description,
    setImgUrl,
    setDescription,
    setTitle,
    setPublish,
    setTitleValidation,
    titleValidation,
  ] = useArticleStore((state: ArticleState) => [
    state.img,
    state.setImg,
    state.title,
    state.imgUrl,
    state.description,
    state.setImgUrl,
    state.setDescription,
    state.setTitle,
    state.setPublish,
    state.setTitleValidation,
    state.titleValidation,
  ]);

  useEffect(() => {
    if (pathname?.articleId) {
      setTitle(editedTitle);
      setDescription(editedDescription);
      setImg(editedArticleImgUrl);
    }
  }, []);

  const handleImageUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setImgUrl(e.target.files[0]);
    setImg(URL.createObjectURL(e.target.files[0]));
    setUploadButton(false);
  };

  const handleTitleValidation = (val: string) => {
    const words = val.split(" ");
    if (words.length > 10) setTitleValidation(true);
    else setTitleValidation(false);
  };

  return (
    <>
      <Navbar buttonText={"Publish"} status="writeArticle" />
      <div className="w-full grid grid-rows-8 grid-flow-col md:gap-x-4 mx-auto max-w-[90%] md:max-w-6xl mt-[30px]">
        <div className="row-span-6 h-full col-span-7">
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
        <div className="bg-[#F2F2F2] row-span-2 col-span-1 w-full flex flex-auto p-3 justify-center  rounded-[20px]">
          <div className="flex flex-col text-semibold justify-around">
            <div className="flex text-center">
              <Atom className="w-6 h-6 text-[#4092b3] animate-spin" />
              <p> Ask Chat-GPT to summarize your article</p>
            </div>
            <ul className="list-disc mt-5">
              {impPoints.map((point, index) => {
                return <li key={index}>{point}</li>;
              })}
            </ul>
            <Button variant="outline" className="rounded-full mt-5">
              Ask
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default WriteArticle;
