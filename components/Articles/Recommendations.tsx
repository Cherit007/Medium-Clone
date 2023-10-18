"use client";
import Image from "next/image";
import { Search, MailPlus } from "lucide-react";
import Logo from "../../public/logo.png";
import TopicRecommendation from "./TopicRecommendation";
import useArticleStore from "@/store/useArticleStore";

const styles = {
  wrapper: `h-screen min-w-[10rem] sticky top-0 max-w-[30rem] flex-[1.2] p-[2rem]`,
  content: ``,
  accentedButton: `flex items-center justify-center text-sm bg-black text-white my-[2rem] py-[0.6rem] rounded-full`,
  searchBar: `flex items-center gap-[0.6rem] h-[2.6rem] border px-[1rem] rounded-full`,
  searchInput: `border-none outline-none bg-none w-full`,
  authorContainer: `flex flex-col items-center mt-5`,
  authorImageContainer: `h-[5rem] w-[5rem] rounded-full overflow-hidden`,
  authorName: `font-semibold mb-[0.2rem] mt-[1rem]`,
  authorFollowing: `text-[#787878]`,
  authorActions: `flex gap-[0.6rem] my-[1rem]`,
  actionButton: `bg-[#1A8917] text-white rounded-full px-[0.6rem] py-[.4rem] text-sm`,
  recommendationContainer: ``,
  title: ``,
  articlesContainer: ``,
  recommendationAuthorImageContainer: `rounded-full overflow-hidden h-[1.4rem] w-[1.4rem]`,
  recommendationAuthorContainer: `flex items-center gap-[.6rem]`,
  recommendationAuthorName: `text-sm`,
  recommendationTitle: `font-bold`,
  recommendationThumnailContianer: `flex flex-1 items-center justify-center h-[4rem] w-[4rem]`,
  recommendationThumbnail: `object-cover`,
  articleContentWrapper: `flex items-center justify-between cursor-pointer my-[1rem]`,
  articleContent: `flex-[4]`,
};
const Recommendations = ({ user }: { user: any }) => {
  const [currentArticle, userArticles] = useArticleStore((state) => [
    state.currentArticle,
    state.userArticles,
  ]);
  return (
    <div className={styles.wrapper}>
      <div className={styles.accentedButton}>Get Unlimited Access</div>
      <div className={styles.searchBar}>
        <Search />
        <input
          className={styles.searchInput}
          placeholder="Search"
          type="text"
        />
      </div>
      <div className={styles.authorContainer}>
        <div className={styles.authorImageContainer}>
          <Image src={Logo} alt="DP" width={100} height={100} />
        </div>
        <div className={styles.authorName}>{user?.name}</div>
        <div className={styles.authorFollowing}>2M Followers</div>
        <div className={styles.authorActions}>
          <button className={styles.actionButton}>Follow</button>
          <button className={styles.actionButton}>
            <MailPlus />
          </button>
        </div>
        <TopicRecommendation heading={"#Topics"} user={user} description={currentArticle?.description as string} />
      </div>
    </div>
  );
};
export default Recommendations;
