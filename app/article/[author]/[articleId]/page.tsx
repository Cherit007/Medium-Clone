import Recommendations from "../../../../components/Articles/Recommendations/Recommendations";
import ArticleMain from "../../../../components/Articles/ArticleMain";
import Navbar from "@/components/Navbar/Navbar";
import { currentProfile } from "@/lib/current-profile";
import RecommendedArticles from "@/components/Articles/Recommendations/RecommendedArticles";

const Article = async () => {
  const user = await currentProfile();
  return (
    <div className="flex flex-col">
      <Navbar buttonText="Write" status="navbar" />
      <div className="flex flex-grow h-full">
        <ArticleMain user={user}/>
        <Recommendations user={user} />
      </div>
      <RecommendedArticles currentUser={user} />
    </div>
  );
};
export default Article;
