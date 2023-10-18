import ReadersNav from "../../../components/Articles/ReadersNav";
import Recommendations from "../../../components/Articles/Recommendations";
import ArticleMain from "../../../components/Articles/ArticleMain";
import Navbar from "@/components/Navbar/Navbar";
import { currentProfile } from "@/lib/current-profile";
const styles = {
  content: `flex flex-col`,
};
const Article = async () => {
  const user = await currentProfile();
  return (
    <div className={styles.content}>
      <Navbar buttonText="Write" status="navbar" />
      <div className="flex">
        <ReadersNav />
        <ArticleMain />
        <Recommendations user={user} />
      </div>
      {/* <Footer /> */}
    </div>
  );
};
export default Article;
