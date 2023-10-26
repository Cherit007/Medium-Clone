import { database, storage } from "@/appwriteConfig";
import ArticleFeed from "@/components/Articles/ArticleFeed";
import SideBarFeed from "@/components/Articles/SideBarFeed";
import Navbar from "@/components/Navbar/Navbar";
import { currentProfile } from "@/lib/current-profile";
import { decryptText } from "@/lib/encrypt-decrypt";
import { redirectUser } from "@/lib/redirect-user";
import Home from "@/pages/home";
import { Query } from "appwrite";

const fetchFeedArticles = async (user: any) => {
  let articles: ArticleProps[] = [];
  const topics = user?.userTopics;
  const results = await Promise.all(
    topics?.map(async (item: string) => {
      const res = await database.listDocuments(
        "651d2c31d4f6223e24e2",
        "651d2c5fca0e679e84a7",
        [Query.equal("topic", item)]
      );
      return res.documents;
    })
  );

  const fetchImgUrls = (urlId: string, index: number) => {
    if (urlId) {
      const imgs = storage.getFilePreview("6522a1f72adc01958f6c", urlId);
      articles[index].articleImgUrl = imgs.href;
    } else articles[index].articleImgUrl = "";
  };

  articles = articles.concat(...results);
  articles.forEach((item, index) => {
    fetchImgUrls(item?.articleImgUrl, index);
    // articles[index].description = decryptText(
    //   item.description,
    //   "secretKey"
    // ) as string;
  });

  let hotTopics: string[] = [];
  const fetchHotTopics = () => {
    articles.forEach((item: ArticleProps) => {
      hotTopics = hotTopics.concat(item?.subTopics as []);
    });

    const map = new Map<string, number>();

    hotTopics?.forEach((val) => {
      if (!map.has(val)) {
        map.set(val, 1);
      } else {
        map.set(val, (map.get(val) as number) + 1);
      }
    });
    let frequencyArray = Array.from(map);
    frequencyArray.sort((a, b) => b[1] - a[1]);
    const frequencyArr: string[] = frequencyArray
      .map(([key, _]) => key)
      .slice(0, 5);
    return frequencyArr;
  };
  const hotTopicsArr = fetchHotTopics();

  return [articles, hotTopicsArr];
};

const HomePage = async () => {
  await redirectUser();
  // cronSetup()
  const user = await currentProfile();
  let articles, hotTopicsArr;
  if (user) [articles, hotTopicsArr] = await fetchFeedArticles(user);
  return (
    <>
      {!user?.$id ? (
        <Home />
      ) : (
        <>
          <Navbar buttonText="Write" status="navbar" />
          <main className="w-full grid grid-cols-3 max-w-6xl mx-auto">
            <div className="col-span-3 md:col-span-2 mt-1 p-5">
              <ArticleFeed articles={articles} currentUser={user} />
            </div>
            <div className="hidden md:flex col-span-1 sticky top-[100px] h-screen overflow-auto no-scrollbar">
              <SideBarFeed hotTopicsArr={hotTopicsArr} currentUser={user} />
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default HomePage;
