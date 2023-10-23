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
  setRecommendedArticle(resp.data?.data);
  setLoading(false);
};
