"use client";
import Image from "next/image";
import {
  PlayCircle,
  Loader,
  Lock,
  Heart,
  MessageCircle,
  ThumbsUp,
  MessageSquare,
  Bookmark,
  Share,
} from "lucide-react";
import useArticleStore from "@/store/useArticleStore";
import { calculateTime } from "@/lib/calculate-time";
import { useEffect, useRef, useState } from "react";
import { database, storage } from "@/appwriteConfig";
import { ID, Query } from "appwrite";
import { usePathname } from "next/navigation";
import axios from "axios";
import { calculateArticleReadTime } from "@/lib/calculate-read-time";
import { useToast } from "../ui/use-toast";
import { v4 as uuidv4 } from "uuid";

const styles = {
  wrapper: `flex items-center justify-center flex-[3] ml-[80px] px-10 border-l border-r`,
  content: `h-full w-full p-[2rem]`,
  articleHeaderContainer: `flex justify-between items-center mt-[2.2rem] mb-[1.2rem]`,
  authorContainer: `flex gap-[1rem]`,
  authorImageContainer: `h-[3rem] w-[3rem] grid center rounded-full overflow-hidden`,
  column: `flex-1 w-full flex flex-col justify-center`,
  postDetails: `flex gap-[0.2rem] items-center text-[#787878]`,
  listenButton: `flex items-center gap-[.2rem] text-[#1A8917] cursor-pointer`,
  socials: `flex gap-[1rem] text-[#787878] cursor-pointer`,
  space: `w-[.5rem]`,
  articleMainContainer: `flex flex-col gap-[1rem]`,
  bannerContainer: `h-[18rem] w-full grid center overflow-hidden mb-[2rem] mx-auto`,
  title: `font-bold text-3xl`,
  subtitle: `font-mediumSerifItalic text-[1.4rem] text-[#292929] font-semibold`,
  articleText: `font-mediumSerif text-[1.4rem] text-[#292929] h-full`,
  articleInteractionBar: `flex items-center justify-between mt-[.2rem] mb-[.2rem] border-t border-b`,
  articleFeedback: `flex items-center justify-center gap-[2rem] py-[1rem]`,
  articleOptions: `flex items-center justify-center gap-[2rem] py-[1rem]`,
  articleLike: `flex items-center gap-[0.7rem]`,
  articleLikeButton: `cursor-pointer text-[#787878] hover:text-[#000]`,
  articleLikes: `cursor-pointer text-[#787878] hover:text-[#000]`,
  articleComment: `flex items-center gap-[0.7rem] cursor-pointer text-[#787878] hover:text-[#000]`,
  articleCommentButton: ``,
  articleComments: ``,
  articleSave: ``,
  articleSaveButton: `cursor-pointer text-[#787878] hover:text-[#000]`,
  articleShare: ``,
  articleShareButton: `cursor-pointer text-[#787878] hover:text-[#000]`,
};
const ArticleMain = ({ user }: { user: any }) => {
  const userId = user?.$id;
  const name = user?.name;
  const [
    currentArticle,
    setCurrentArticle,
    setLoading,
    loading,
    savedArticle,
    setSavedArticle,
    onOpen,
  ] = useArticleStore((state) => [
    state.currentArticle,
    state.setCurrentArticle,
    state.setLoading,
    state.loading,
    state.savedArticle,
    state.setSavedArticle,
    state.onOpen,
  ]);
  const { toast } = useToast();
  const [isMember, setIsMember] = useState(false);
  const callApi = useRef(true);
  const isSavedArticle = savedArticle?.find(
    (i) => i?.$id === (currentArticle?.$id as any)
  );
  const isLikedArticle = currentArticle?.likes?.find(
    (i: any) => i.userId === user?.$id
  );
  const [audioDataLocation, setAudioDataLocation] = useState<any>();
  const [audioDataAvailable, setAudioDataAvailable] = useState<boolean>(false);
  const [audioEnable, setAudioEnable] = useState<boolean>(false);
  const [showAudioBar, setShowAudioBar] = useState<boolean>(false);
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const pathname = usePathname();
  const articleId = pathname?.split("/").pop() as string;

  const handleListenClickForNonMember = async () => {
    window.location.href = "/plans";
  };

  useEffect(() => {
    const fetchArticle = async () => {
      if (callApi.current) {
        callApi.current = false;
        setLoading(true);
        if (user.is_member === true) {
          setIsMember(true);
        }
        const res = await database.listDocuments(
          "651d2c31d4f6223e24e2",
          "651d2c5fca0e679e84a7",
          [Query.equal("$id", articleId)]
        );
        if (res.documents) {
          let articles = res.documents[0];
          // articles.description = decryptText(articles?.description, "secretKey");
          if(articles?.likes){
            const like: boolean = articles?.likes?.find((i: any) => i?.userId === user?.$id)?.likeStatus;
            setIsLiked(like);
          }
          if (articles?.articleImgUrl) {
            const imgs = storage.getFilePreview(
              "6522a1f72adc01958f6c",
              articles?.articleImgUrl
            );
            articles.articleImgUrl = imgs.href;
          } else articles.articleImgUrl = "";

          if (articles?.audioUrl) {
            setAudioDataLocation(articles?.audioUrl);
            setAudioDataAvailable(true);
          }
          setCurrentArticle(articles);
          setLoading(false);
        }
      }
    };
    fetchArticle();

  }, []);

  const storeMp3DataInStorage = async (file: any) => {
    const response = await fetch(file);
    const blob = await response.blob();
    const audioFile = new File([blob], `${currentArticle?.$id}.mp3`, {
      type: "audio/mpeg",
    });

    const audioUrl = await storage.createFile(
      "6522a1f72adc01958f6c",
      ID.unique(),
      audioFile
    );
    if (audioUrl?.$id) {
      const audioFileUrl = storage.getFileView(
        "6522a1f72adc01958f6c",
        audioUrl?.$id
      );
      setAudioDataLocation(audioFileUrl?.href);
      await database.updateDocument(
        "651d2c31d4f6223e24e2",
        "651d2c5fca0e679e84a7",
        articleId,
        {
          audioUrl: audioFileUrl,
        }
      );
      const payload = {
        id: currentArticle?.$id,
        status: "delete",
      };
      await axios.post("/api/text-speech", payload);
    }
  };
  const handleListenClick = async () => {
    try {
      setAudioEnable(true);
      if (!audioDataAvailable) {
        const payload = {
          text: currentArticle?.description,
          id: currentArticle?.$id,
          status: "add",
        };
        await axios.post("/api/text-speech", payload);
        await storeMp3DataInStorage(`/assets/${currentArticle?.$id}.mp3`);
        setAudioEnable(false);
        setShowAudioBar(true);
      } else {
        setTimeout(() => {
          setShowAudioBar(true);
        }, 1000);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const handleSavedArticle = async (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    item: ArticleProps | undefined
  ) => {
    e.stopPropagation();
    toast({
      variant: "destructive",
      title: "Saved this article",
      className: "bg-[green] text-white rounded-[20px]",
    });
    if (!isSavedArticle) {
      setSavedArticle([...savedArticle, item]);
      await database.updateDocument(
        "651d2c31d4f6223e24e2",
        "65219b9e7c62b9078824",
        user?.$id as string,
        {
          savedArticles: [...(user?.savedArticles || []), item?.$id],
        }
      );
    } else {
      toast({
        className: "bg-[red] text-white rounded-[20px]",
        variant: "default",
        title: "Removed this article",
      });
      const newArr = savedArticle;
      const index = newArr.findIndex((i) => i?.$id === item?.$id);
      newArr.splice(index, 1);
      setSavedArticle(newArr);
      await database.updateDocument(
        "651d2c31d4f6223e24e2",
        "65219b9e7c62b9078824",
        user?.$id as string,
        {
          savedArticles: newArr.map((article) => article?.$id),
        }
      );
    }
  };
  const handleArticleLike = async () => {
    let likedArticle;
    if (!isLikedArticle) {
      setIsLiked(true);
      const uid = uuidv4();
      likedArticle = await database.createDocument(
        "651d2c31d4f6223e24e2",
        "653f86c8df6f233db9e5",
        uid,
        {
          articleId: currentArticle?.$id,
          likesCount: currentArticle?.likes.length + 1,
          articles: currentArticle?.$id,
          userId: user?.$id,
          likeStatus: true,
        }
      );
    } else if (isLikedArticle && isLikedArticle?.likeStatus) {
      setIsLiked(false);
      likedArticle = await database.updateDocument(
        "651d2c31d4f6223e24e2",
        "653f86c8df6f233db9e5",
        isLikedArticle.$id,
        {
          likesCount:
            currentArticle?.likes.length > 0
              ? currentArticle?.likes.length - 1
              : 0,
          likeStatus: false,
        }
      );
    } else if (isLikedArticle && !isLikedArticle?.likeStatus) {
      setIsLiked(true);
      likedArticle = await database.updateDocument(
        "651d2c31d4f6223e24e2",
        "653f86c8df6f233db9e5",
        isLikedArticle.$id,
        {
          likesCount: currentArticle?.likes.length + 1,
          likeStatus: true,
        }
      );
    }
    const updatedArticle = await database.listDocuments(
      "651d2c31d4f6223e24e2",
      "651d2c5fca0e679e84a7",
      [Query.equal("$id", likedArticle?.articleId)]
    );
    setCurrentArticle(updatedArticle.documents[0]);
  };
  const articleLikesCount = currentArticle?.likes?.filter(
    (i: any) => i.likeStatus === true
  ).length;
  const copyToClipboard = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    toast({
      variant: "default",
      title: "URL Copied to the Clipboard",
      className: "bg-[black] text-white rounded-[20px]",
    });
  };
  return (
    <div className={styles.wrapper}>
      {loading ? (
        <p className="flex items-center justify-center h-[60vh]">
          <Loader className="w-6 h-6 animate-spin" />{" "}
        </p>
      ) : (
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
                    {calculateTime(currentArticle?.$createdAt as string)}{" "}
                    {" • "}
                    {currentArticle?.description &&
                      calculateArticleReadTime(
                        currentArticle?.description || ""
                      )}
                    {" • "}
                  </span>
                  <div
                    onClick={handleListenClick}
                    className={styles.listenButton}
                  >
                    {audioEnable && !showAudioBar && isMember ? (
                      <p className="flex justify-between items-center cursor-text">
                        Converting to speech...
                        <img
                          src="/audio-book.png"
                          className="ml-0 w-5 h-5 animate-bounce cursor-default"
                        />
                      </p>
                    ) : !audioEnable && !showAudioBar && isMember ? (
                      <>
                        <PlayCircle
                          className={`${audioEnable && "animate-ping"}`}
                        />
                        <span> Listen</span>
                      </>
                    ) : (
                      <></>
                    )}
                    {audioDataLocation && showAudioBar && (
                      <audio
                        src={audioDataLocation}
                        controls
                        className="w-40"
                      />
                    )}
                  </div>
                  <div
                    className={styles.listenButton}
                    onClick={handleListenClickForNonMember}
                  >
                    {/* <Link href="/plans"> */}
                    {!isMember && (
                      <>
                        <PlayCircle
                          className={`${audioEnable && "animate-ping"}`}
                        />
                        <span> Listen</span>
                        <Lock />
                      </>
                    )}
                    {/* </Link> */}
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={styles.socials}>
              <Bookmark />
              <MoreHorizontal />
            </div> */}
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
              Written by {currentArticle?.users?.name}
            </h4>
            <div className={styles.articleText}>
              {currentArticle?.description}
            </div>
          </div>
          <div className={styles.articleInteractionBar}>
            <div className={styles.articleFeedback}>
              <div className={styles.articleLike}>
                <ThumbsUp
                  fill={isLiked ? "black" : "none"}
                  onClick={handleArticleLike}
                  className={styles.articleLikeButton}
                />
                <span className={styles.articleLikes}>
                  {articleLikesCount || "0"}
                </span>
              </div>
              <div className={styles.articleComment}>
                <MessageSquare
                  onClick={() => onOpen("commentArticle", { userId, name })}
                  className={styles.articleCommentButton}
                />
                <span className={styles.articleComments}>
                  {currentArticle?.comments?.length || "0"}
                </span>
              </div>
            </div>
            <div className={styles.articleOptions}>
              <div className={styles.articleSave}>
                <Bookmark
                  fill={isSavedArticle ? "black" : "none"}
                  onClick={(e) => handleSavedArticle(e, currentArticle)}
                  className={styles.articleSaveButton}
                />
              </div>
              <div className={styles.articleShare}>
                <Share
                  onClick={copyToClipboard}
                  className={styles.articleShareButton}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArticleMain;
