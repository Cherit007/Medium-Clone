"use client";
import Image from "next/image";
import {
  PlayCircle,
  Twitter,
  Facebook,
  Linkedin,
  Link,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";
import useArticleStore from "@/store/useArticleStore";
import { calculateTime } from "@/lib/calculate-time";
import { useEffect } from "react";
import { database, storage } from "@/appwriteConfig";
import { Query } from "appwrite";
import { usePathname } from "next/navigation";

const styles = {
  wrapper: `flex items-center justify-center flex-[3] ml-[80px] px-10 border-l border-r`,
  content: `h-screen w-full p-[2rem]`,
  articleHeaderContainer: `flex justify-between items-center mt-[2.2rem] mb-[1.2rem]`,
  authorContainer: `flex gap-[1rem]`,
  authorImageContainer: `h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`,
  column: `flex-1 flex flex-col justify-center`,
  postDetails: `flex gap-[0.2rem] text-[#787878]`,
  listenButton: `flex items-center gap-[.2rem] text-[#1A8917]`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  articleMainContainer: `flex flex-col gap-[1rem]`,
  bannerContainer: `h-[18rem] w-full grid center overflow-hidden mb-[2rem] mx-auto`,
  title: `font-bold text-3xl`,
  subtitle: `font-mediumSerifItalic text-[1.4rem] text-[#292929]`,
  articleText: `font-mediumSerif text-[1.4rem] text-[#292929] h-full`,
};
const ArticleMain = () => {
  const [currentArticle, setCurrentArticle] = useArticleStore((state) => [
    state.currentArticle,
    state.setCurrentArticle,
  ]);

  const pathname = usePathname();
  const articleId = pathname?.split("/").pop() as string;
  useEffect(() => {
    const fetchArticle = async () => {
      const res = await database.listDocuments(
        "651d2c31d4f6223e24e2",
        "651d2c5fca0e679e84a7",
        [Query.equal("$id", articleId)]
      );
      let articles = res.documents[0];
      if (articles?.articleImgUrl) {
        const imgs = storage.getFilePreview(
          "6522a1f72adc01958f6c",
          articles?.articleImgUrl
        );
        articles.articleImgUrl = imgs.href;
      } else articles.articleImgUrl = "";

      // articles = articles.concat(...results);
      setCurrentArticle(articles);
    };
    fetchArticle();
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <div className={styles.articleHeaderContainer}>
          <div className={styles.authorContainer}>
            <div className={styles.authorImageContainer}>
              <Image
                className="object-cover"
                src={"/Logo.jpeg"}
                width={150}
                height={150}
                alt="author"
              />
            </div>
            <div className={styles.column}>
              <div>{currentArticle?.users?.name}</div>
              <div className={styles.postDetails}>
                <span>
                  {calculateTime(currentArticle?.$createdAt as string)} • 5 mins
                  •{" "}
                </span>
                <span className={styles.listenButton}>
                  <PlayCircle />
                  Listen
                </span>
              </div>
            </div>
          </div>
          <div className={styles.socials}>
            <Twitter />
            <Facebook />
            <Linkedin />
            <Link />
            <div className={styles.space} />
            <Bookmark />
            <MoreHorizontal />
          </div>
        </div>
        <div className={styles.articleMainContainer}>
          {currentArticle?.articleImgUrl && (
            <div className={styles.bannerContainer}>
              <Image
                className="object-contain"
                src={currentArticle?.articleImgUrl}
                alt="banner"
                height={100}
                width={200}
              />
            </div>
          )}
          <h1 className={styles.title}>{currentArticle?.title}</h1>
          <h4 className={styles.subtitle}>
            <div>{currentArticle?.users?.name}</div>
            <div>Brief: ShortNotes</div>
          </h4>
          <div className={styles.articleText}>
            {currentArticle?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticleMain;
