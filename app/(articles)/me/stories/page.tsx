import SideBarFeed from "@/components/Articles/SideBarFeed";
import Navbar from "@/components/Navbar/Navbar";
import { currentProfile } from "@/lib/current-profile";
import AuthorStories from "@/pagesfolder/Stories/AuthorStories";
import React, { Suspense } from "react";
import { Loader } from "lucide-react";

async function Stories() {
  const user = await currentProfile();
  return (
    <>
      <Navbar buttonText="Write" status="navbar" />
      <main className="w-full grid grid-cols-3 max-w-6xl mx-auto">
        <div className="col-span-3 md:col-span-2 mt-1 p-5">
          <Suspense
            fallback={
              <p className="bg-red-300 flex justify-center items-center w-full h-[100vh]">
                <Loader className="w-6 h-6 animate-spin" />
              </p>
            }
          >
            <AuthorStories  />
          </Suspense>
        </div>
        <div className="hidden md:flex col-span-1">
          <SideBarFeed currentUser={user}/>
        </div>
      </main>
    </>
  );
}

export default Stories;
