import { decryptText } from "@/lib/encrypt-decrypt";

export const fetchArticles = async (setLoading: any, setUserArticles: any) => {
  setLoading(true);
  const data = await fetch("http://localhost:3000/api/user/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  // const articles = res.data;
  // articles.forEach((item: ArticleProps, index: number) => {
  //   articles[index].description = decryptText(
  //     item.description,
  //     "secretKey"
  //   ) as string;
  // });
  setUserArticles(res.data);
  setLoading(false);
};
