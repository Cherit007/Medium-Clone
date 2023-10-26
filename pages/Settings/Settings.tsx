"use client";
import Navbar from "@/components/Navbar/Navbar";
import { Button } from "@/components/ui/button";
import useArticleStore from "@/store/useArticleStore";
import { CornerDownRight, MoveUpRight } from "lucide-react";
import React from "react";

function Settings({ user }: { user: any }) {
  const [onOpen] = useArticleStore((state) => [state.onOpen]);
  const $id = user?.$id;
  const userId = user?.userId;

  return (
    <div>
      <Navbar buttonText="Write" status="navbar" />
      <div className="max-w-3xl mx-auto mt-10">
        <h2 className="font-semibold text-[30px]">Settings</h2>
        <div className="mt-10 p-2 space-y-8">
          <div className="flex justify-between">
            <p>Email address</p>
            <p className="text-[#6B6B6B]">{user?.email}</p>
          </div>
          <div className="flex justify-between">
            <p>Username</p>
            <p className="text-[#6B6B6B]">{user?.name}</p>
          </div>
          <div className="flex justify-between items-center">
            <div>
              <p>Profile information</p>
              <p className="text-[#6B6B6B] text-sm">
                Edit your photo, name, etc.
              </p>
            </div>
            <MoveUpRight className="w-5 h-5 text-[#6B6B6B]" />
          </div>
          <Button
            onClick={() => onOpen("userAccountDelete", { $id: $id ,userId:userId })}
            className="flex flex-col items-start p-0 text-[#C94A4A]"
          >
            Delete account
            <p className="text-[#6B6B6B] text-sm">
              Permanently delete your account and all of your content.
            </p>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default Settings;
