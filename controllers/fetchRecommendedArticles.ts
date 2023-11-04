import axios from "axios";

export const fetchRecommdedArticles = async (
  title: string,
  setRecommendedArticle: any,
  setLoading: any
) => {
  setLoading(true);
  const payload = {
    article_name: title,
  };
  const resp = await axios.post("/api/recommendations", payload);
  if (resp.status === 200) setRecommendedArticle(resp.data?.data);
  else setRecommendedArticle([]);
  setLoading(false);
};
