"use client";

import { database } from "@/appwriteConfig";
import { Button } from "@/components/ui/button";
import { topics } from "@/constants";
import { Check, Loader2, Plus } from "lucide-react";
// import { topics } from "@/constants";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Welcome({ user }: any) {
  const [userTopics, setUserTopics] = useState<UserTopics[]>(topics);
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonState, setButtonState] = useState<boolean>(true);
  const router = useRouter();

  const handleAddTopics = (item: UserTopics) => {
    const index = userTopics.findIndex((i) => i.topic === item.topic);

    if (index !== -1) {
      const updatedTopics = [...userTopics];
      updatedTopics[index].selected = !updatedTopics[index].selected;
      setUserTopics(updatedTopics);
    } else {
      setUserTopics([...userTopics, { ...item, selected: true }]);
    }
    const data = prepareTopicsPayload(userTopics);
    if (data.length < 3) setButtonState(true);
    else setButtonState(false);
  };

  const prepareTopicsPayload = (userTopics: UserTopics[]) => {
    let newArr = [];
    newArr = userTopics
      .filter((item) => item.selected === true)
      .map((item) => item.topic);
    return newArr;
  };

  const handleTopic = async () => {
    setLoading(true);

    const payload = prepareTopicsPayload(userTopics);

    await database.updateDocument(
      "651d2c31d4f6223e24e2",
      "65219b9e7c62b9078824",
      user?.$id,
      {
        userTopics: payload,
        signUpStatus: "home",
      }
    );

    router.push("/");
    setLoading(false);
  };
  return (
    <div className="flex flex-col justify-center items-center space-y-10 max-w-4xl mx-auto">
      <Image src={"/Logo.jpeg"} height={120} width={130} alt="logo" />
      <div className="flex flex-col text-center space-y-5">
        <p className="text-semibold text-[30px]">What are you interested in?</p>
        <p className="text-semibold text-[15px]">Choose three or more.</p>
      </div>
      <div className="flex flex-wrap">
        {userTopics.map((item: UserTopics, index: number) => (
          <div
            key={index}
            onClick={() => handleAddTopics(item)}
            className={`bg-[#F2F2F2] ${
              item?.selected && "outline-[#42c03e] outline-2 outline"
            } cursor-pointer rounded-[15px] text-[#242424] text-sm p-2 m-2 flex items-center space-x-2`}
          >
            <label
              htmlFor="terms"
              className="text-sm font-medium cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item?.topic}
            </label>
            {item?.selected ? (
              <Check className="w-4 h-4 text-[#42c03e]" />
            ) : (
              <Plus id="terms" className="w-4 h-4" />
            )}
          </div>
        ))}
      </div>{" "}
      <Button
        onClick={handleTopic}
        disabled={buttonState}
        className="bg-[#1A8917] cursor-pointer text-white rounded-full p-2 text-sm hover:bg-[#399c36]"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin mr-3" />}
        Continue
      </Button>
    </div>
  );
}
