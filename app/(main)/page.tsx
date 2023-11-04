import { database, storage } from "@/appwriteConfig";
import { StripePaymentCheck } from "@/controllers/StripePaymentCheck";
import { cronSetup } from "@/lib/cronSetup";
import { currentProfile } from "@/lib/current-profile";
import { decryptText } from "@/lib/encrypt-decrypt";
import { redirectUser } from "@/lib/redirect-user";
import UserFeed from "@/pagesfolder/Feed/UserFeed";
import Home from "@/pagesfolder/home";
import { Query } from "appwrite";
import { useRef } from "react";

const fetchPaymentDetails = async (user: any) => {
  let session;
  if (user.payment_session_id) {
    session = await StripePaymentCheck(
      process.env.STRIPE_SECRET_KEY,
      user.payment_session_id
    );
  } else {
    session = { payment_status: "unpaid" };
  }
  return session.payment_status;
};

const updatePaymentStatus = async (user: any) => {
  await database.updateDocument(
    "651d2c31d4f6223e24e2",
    "65219b9e7c62b9078824",
    user?.$id,
    {
      is_member: true,
    }
  );
};

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
  const user = await currentProfile();
  cronSetup();
  let feedForUser, paymentDetails, currentUser;
  currentUser = user;
  if (user) {
    feedForUser = await fetchFeedArticles(user);
    if (user.payment_session_id) {
      paymentDetails = await fetchPaymentDetails(user);
      if (paymentDetails === "paid") {
        await updatePaymentStatus(user);
        // currentUser = await currentProfile();
        user.is_member = true;
      }
    }
  }
  return (
    <>
      {!user?.$id ? (
        <Home />
      ) : (
        <UserFeed
          user={currentUser}
          feedForUser={feedForUser}
          secret_key={process.env.STRIPE_SECRET_KEY}
          app_url={process.env.NEXT_PUBLIC_BASE_URL}
        />
      )}
    </>
  );
};

export default HomePage;
