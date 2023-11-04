import { database, storage } from "@/appwriteConfig";
import { currentProfile } from "@/lib/current-profile";
import { Query } from "appwrite";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    let articles: ArticleProps[] = [];
    const user = await currentProfile();
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
    return NextResponse.json({
      articles: articles,
    });
  } catch (e) {
    console.log(e);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
