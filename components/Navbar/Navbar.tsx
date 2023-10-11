"use client";
import useArticleStore from "@/store/useArticleStore";
import { useAuth, useClerk } from "@clerk/nextjs";
import '@/../../app/globals.css'
import {
  Bell,
  LogOut,
  PenSquare,
  Scroll,
  Search,
  Settings,
  Sparkles,
  User2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

function Navbar({ buttonText, status }: NavbarProps) {
  const { signOut } = useClerk();
  const { userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [title, description, onOpen, titleValidation] = useArticleStore(
    (state: ArticleState) => [
      state.title,
      state.description,
      state.onOpen,
      state.titleValidation,
    ]
  );

  const isSignedIn = userId !== null;
  const handleWriteArticle = () => {
    if (!isSignedIn) router.push("/sign-in");
    else if (pathname === "/") router.push("/write-story");
    else onOpen("writeArticle", { title, description });
  };

  const navbarStatus = status === "writeArticle";

  useEffect(() => {
    const navbar = document.querySelector(".nav-sticky") as Element;
    window.onscroll = () => {
      if (window.scrollY > 440) {
        navbar.classList.add("nav-active");
      } else {
        navbar.classList.remove("nav-active");
      }
    };
  }, []);

  return (
    <nav
      className={`flex justify-between nav-sticky w-full ${
        !isSignedIn && "sticky top-0 bg-[#FEC016] border-b-1 border-[black] transition ease-in-out delay-150"
      }`}
    >
      <div className="flex ml-6 items-center">
        <div className="flex items-center">
          <Link href={"/"}>
            <Image
              src={"/Logo.jpeg"}
              alt="logo"
              width={80}
              height={80}
              className="opacity-70 mr-3 rounded-full"
            />
          </Link>
          {!isSignedIn && <p className="text-[30px] font-bold">MindScribe</p>}
        </div>
        {isSignedIn &&
          (!navbarStatus ? (
            <div className="bg-[#F9F9F9] flex h-[40px] items-center rounded-md space-x-5">
              <Search className="w-6 h-6 ml-2 text-[#6B6B6B]" />
              <input
                type="text"
                placeholder="Search MindScribe"
                className="outline-none bg-[#F9F9F9]  rounded-sm placeholder:text-[#6B6B6B]"
              />
            </div>
          ) : (
            <div>Draft in C</div>
          ))}
      </div>
      <div className="flex items-center justify-end mr-5 flex-1 gap-5">
        <Button
          variant="ghost"
          onClick={handleWriteArticle}
          disabled={
            pathname === "/write-story" && (title === "" || titleValidation)
          }
          className={
            navbarStatus
              ? "bg-[#1A8917] cursor-pointer text-white rounded-full p-2 text-sm hover:bg-[#399c36]"
              : "cursor-pointer flex text-[#6B6B6B] hover:text-slate-900"
          }
        >
          {isSignedIn && !navbarStatus && (
            <PenSquare className="w-6 h-6 cursor-pointer mr-2 text-[#6B6B6B]" />
          )}
          {buttonText}
        </Button>
        {isSignedIn && !navbarStatus && (
          <Bell className="w-6 h-6 text-[#6B6B6B]" />
        )}
        {isSignedIn && (
          <div className="flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage src="https://github.com/shadcn.png" />
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-[white]">
                <DropdownMenuLabel className="cursor-pointer">
                  My Account
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User2 className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                  Profile
                </DropdownMenuItem>
                <Link href={"/me/stories"}>
                  {" "}
                  <DropdownMenuItem className="cursor-pointer">
                    <Scroll className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                    Stories
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuItem>
                  <Settings className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Sparkles className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                  Become a member
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => signOut()}
                >
                  <LogOut className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
        {!isSignedIn && (
          <Link href="/sign-in">
            <Button
              variant="default"
              className="bg-black text-white rounded-[20px] hover:bg-black"
            >
              Get Started
            </Button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
