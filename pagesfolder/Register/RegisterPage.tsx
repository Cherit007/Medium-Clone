"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function RegisterPage({ user }: any) {
  const [name, setName] = useState<string>(user?.name);
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleCreateAccount = async () => {
    setLoading(true);
    const payload = {
      recipient_email: user?.email,
      subject: `Welcome ${user?.name}`,
      message:
        "Welcome to MindScribe. We're thrilled to have you on board! Your journey to mindfulness and personal development begins here.",
      name: name,
    };
    await axios.post("/api/email", payload);
    router.push("/welcome");
    setLoading(false);
  };

  return (
    <div className="flex flex-col justify-center items-center space-y-10 max-w-4xl mx-auto">
      <Image src={"/Logo.jpeg"} height={120} width={130} alt="logo" />
      <div className="flex flex-col text-center space-y-5">
        <p className="text-semibold text-[30px]">Almost there!</p>
        <p className="text-semibold text-[18px]">
          Finish creating your account for the full MindScribe experience.
        </p>
      </div>
      <div className="text-[#6B6B6B] text-center w-full flex flex-col items-center space-y-3">
        <label htmlFor="name">Your full name</label>
        <input
          id="name"
          type="text"
          onChange={(e) => setName(e.target.value)}
          defaultValue={user?.name}
          className="bg-red w-[60%] outline-none border-b-2 pb-3"
          placeholder="Enter your name"
        />
      </div>
      <div className="text-[#6B6B6B] text-center w-full flex flex-col items-center space-y-3">
        <label htmlFor="name">Your email</label>
        <p className="text-black">{user?.email}</p>
      </div>

      <Button
        onClick={handleCreateAccount}
        className="bg-[#1A8917] cursor-pointer text-white rounded-full p-2 text-sm hover:bg-[#399c36]"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin mr-3" />}
        Create Account
      </Button>
    </div>
  );
}

export default RegisterPage;
