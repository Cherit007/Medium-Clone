import ArticleFeed from "@/components/Articles/ArticleFeed";
import SideBarFeed from "@/components/Articles/SideBarFeed";
import Navbar from "@/components/Navbar/Navbar";
import Home from "@/pages/home";
import { auth } from "@clerk/nextjs";
const HomePage = () => {
  const { userId } = auth();
  return (
    <div>
      {!userId ? (
        <Home />
      ) : (
        <>
          <Navbar buttonText="Write" status="navbar" />
          <main className="w-full grid grid-cols-3 max-w-6xl mx-auto">
            <div className="col-span-3 md:col-span-2 mt-1 p-5">
              <ArticleFeed />
            </div>
            <div className="hidden md:flex col-span-1">
              <SideBarFeed />
            </div>
          </main>
        </>
      )}
    </div>
  );
};

export default HomePage;
