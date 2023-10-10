import { Bell, PenSquare, Search } from "lucide-react";
import Image from "next/image";
import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function Navbar() {
  return (
    <nav className="flex justify-between mt-2">
      <div className="flex ml-8 space-x-4 items-center">
        <Image src={"/logo.png"} alt="logo" width={40} height={40} />
        <div className="bg-[#F9F9F9] flex h-[40px] items-center rounded-md space-x-5">
          <Search className="w-6 h-6 ml-2 text-[#6B6B6B]" />
          <input
            type="text"
            placeholder="Search MindScribe"
            className="outline-none bg-[#F9F9F9]  rounded-sm placeholder:text-[#6B6B6B]"
          />
        </div>
      </div>
      <div className="hidden xs:flex items-center justify-end mr-5 flex-1 gap-5">
        <div className="flex text-[#6B6B6B] space-x-2">
          <PenSquare className="w-6 h-6 text-[#6B6B6B]" />
          <span>Write</span>
        </div>
        <Bell className="w-6 h-6 text-[#6B6B6B]" />
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Billing</DropdownMenuItem>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuItem>Subscription</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
