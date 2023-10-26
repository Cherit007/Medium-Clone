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
  const { signOut } = useClerk();
  const { userId } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [searchList, setSearchList] = useState<any>();
  const [searchValue, setSearchValue] = useState<string>("");

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
    if (!isSignedIn) router.push("/sign-in");
    else if (isEditMode) onOpen("editWriteArticle", { title, description });
    else if (pathname === "/write-story") {
      onOpen("writeArticle", { title, description });
    } else {
      setTitle("");
      setDescription("");
      setImg("");
      router.push("/write-story");
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

  const debouncedValue = useDebounceInput({ value: searchValue, delay: 500 });
  useEffect(() => {
    fetchSearchedInput(debouncedValue);
  }, [debouncedValue]);
  const fetchSearchedInput = async (searchValue: string) => {
    try {
      if (searchValue && debouncedValue) {
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
      } else {
        setSearchList([]);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <nav
      className={`flex justify-between max-h-[60px] bg-white sticky top-0 z-1000 nav-sticky  w-full ${
        !isSignedIn &&
        "sticky top-0 bg-[#FEC016] border-b-1 border-[black] transition ease-in-out delay-150"
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
              className="opacity-70 h-13 w-20 mr-3 rounded-full"
            />
          </Link>
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
                {!!searchList &&
                  searchList.map((item: any, index: number) => {
                    return (
                      <Link href={`/${index}/${item?.article_id}`}>
                        <p
                          className="text-black bg-red p-3 cursor-pointer rounded-[20px] hover:bg-[#eceaea]"
                          key={index}
                        >
                          {item?.articles}
                        </p>
                      </Link>
                    );
                  })}
              </div>
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
                <Link href={"/me/profile"}>
                  <DropdownMenuItem className="cursor-pointer">
                    <User2 className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                    Profile
                  </DropdownMenuItem>
                </Link>
                <Link href={"/me/stories"}>
                  {" "}
                  <DropdownMenuItem className="cursor-pointer">
                    <Scroll className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                    Stories
                  </DropdownMenuItem>
                </Link>
                <Link href={"/me/settings"}>
                  <DropdownMenuItem className="cursor-pointer">
                    <Settings className="w-6 h-6 mr-2 text-[#6B6B6B]" />
                    Settings
                  </DropdownMenuItem>
                </Link>
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
