export const fetchArticles = async (setLoading, setUserArticles) => {
  setLoading(true);
  const data = await fetch("http://localhost:3000/api/user/articles", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const res = await data.json();
  setUserArticles(res.data);
  setLoading(false);
};
