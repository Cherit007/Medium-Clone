"use client";
import useArticleStore from "@/store/useArticleStore";
import { useAuth, useClerk } from "@clerk/nextjs";
import "@/../../app/globals.css";
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
import React, { useEffect, useState } from "react";
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
import axios from "axios";
import useDebounceInput from "@/hooks/useDebounceInput";

function Navbar({ buttonText, status }: NavbarProps) {
  const router = useRouter();
  const { signOut } = useClerk();
  const { userId } = useAuth();
  const pathname = usePathname();
  const [searchList, setSearchList] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const [
    title,
    description,
    onOpen,
    titleValidation,
    setDescription,
    setTitle,
    setImg,
  ] = useArticleStore((state: ArticleState) => [
    state.title,
    state.description,
    state.onOpen,
    state.titleValidation,
    state.setDescription,
    state.setTitle,
    state.setImg,
  ]);

  const isSignedIn = userId !== null;
  const isEditMode = pathname?.split("/").pop() === "edit";

  const handleWriteArticle = () => {
    if (!isSignedIn) window.location.href = "/sign-in";
    else if (isEditMode) onOpen("editWriteArticle", { title, description });
    else if (pathname === "/write-story") {
      onOpen("writeArticle", { title, description });
    } else {
      setTitle("");
      setDescription("");
      setImg("");
      window.location.href = "/write-story";
    }
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

  const debouncedValue = useDebounceInput({ value: searchValue, delay: 300 });
  useEffect(() => {
    fetchSearchedInput(debouncedValue);
  }, [debouncedValue]);
  const fetchSearchedInput = async (searchValue: string) => {
    try {
      if (searchValue && debouncedValue) {
        setSearchLoading(true);
        const payload = {
          keyword: debouncedValue,
        };
        const res = await axios.post("/api/search", payload);
        const data = res.data.data;
        const filteredOutput = data.filter((item: any) =>
          item.articles
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        );
        setSearchList(filteredOutput);
        setSearchLoading(false);
      } else {
        setSearchList([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav
      className={`flex justify-between max-h-[200px] bg-white sticky top-0 z-1000 nav-sticky  w-full ${
        !isSignedIn &&
        "sticky top-0 bg-[#FEC016] border-b-1 border-[black] transition ease-in-out delay-150"
      }`}
    >
      <div className="flex ml-6 items-center">
        <div className="flex items-center">
          <Image
            onClick={() => {
              window.location.href = "/";
            }}
            src={"/Logo.jpeg"}
            alt="logo"
            width={80}
            height={80}
            className="opacity-70 h-13 w-20 mr-3 rounded-full cursor-pointer"
          />
          {!isSignedIn && <p className="text-[30px] font-bold">MindScribe</p>}
        </div>
        {isSignedIn &&
          (!navbarStatus ? (
            <div className="flex flex-col h-full">
              <div className="flex items-center bg-[#F9F9F9] h-[40px] rounded-[20px] space-x-5 p-2 mt-3">
                <Search className="w-6 h-6 ml-2 text-[#6B6B6B]" />
                <input
                  onChange={(e) => setSearchValue(e.target.value)}
                  type="text"
                  placeholder="Search MindScribe"
                  className="outline-none bg-[#F9F9F9]  rounded-sm placeholder:text-[#6B6B6B]"
                />
              </div>
              <div className="flex flex-col bg-[#F9F9F9] shadow-black shadow-md max-w-[400px]">
                {searchList && searchList.length > 0
                  ? searchList.map((item: any, index: number) => {
                      return (
                        <p
                          onClick={() => {
                            window.location.href = `/article/${index}/${item?.article_id}`;
                          }}
                          className="text-black bg-red p-3 cursor-pointer rounded-[20px] hover:bg-[#eceaea]"
                          key={index}
                        >
                          {item?.articles}
                        </p>
                      );
                    })
                  : searchValue &&
                    !searchLoading && (
                      <p className="text-black bg-red p-3 cursor-pointer rounded-[20px] hover:bg-[#eceaea]">
                        No results found
                      </p>
                    )}
              </div>
            </div>
          ) : (
            <div>Draft in C</div>
          ))}
      </div>
      <div className="flex items-center justify-end mr-5 flex-1 gap-5">
        {isSignedIn && (
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
        )}

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
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/me/profile")}
                >
                  <User2 className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/me/stories")}
                >
                  <Scroll className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                  Stories
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/me/settings")}
                >
                  <Settings className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => (window.location.href = "/plans")}
                >
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
          <Button
            variant="default"
            onClick={() => (window.location.href = "/sign-in")}
            className="bg-black text-white rounded-[20px] hover:bg-black"
          >
            Get Started
          </Button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
