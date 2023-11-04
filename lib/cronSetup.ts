import { database } from "@/appwriteConfig";
import { Query } from "appwrite";
import axios from "axios";
import cron from "node-cron";
import { currentProfile } from "./current-profile";

export const cronSetup = () => {
  cron.schedule(
    `0 * * * *`,
    async () => {
      try {
        const data = await database.listDocuments(
          "651d2c31d4f6223e24e2",
          "651d2c5fca0e679e84a7",
          [Query.orderDesc("articleRating"), Query.limit(3)]
        );
        const user = await currentProfile();
        const articles = data.documents;

        const url =
          process.env.NEXT_PROD_MODE === "true"
            ? process.env.NEXT_PUBLIC_FRONT_END_URL
            : "http://localhost:3000";
        const newArticles = articles.map((item, index) => {
          return {
            title: item?.title,
            content: item?.description.slice(0, 150),
            link: `${url}/article/${index}/${item?.$id}`,
          };
        });

        const res = await axios.post(
          `${process.env.NEXT_PUBLIC_MAIL_SERVICE_API_URL}/send-email`,
          {
            recipients: [user?.email],
            articles: newArticles,
          }
        );
        console.log(
          "POST request sent to the cron job endpoint and status is ",
          res.data
        );
      } catch (error) {
        console.error("Error sending POST request:", error);
      }
    }
  );
};
