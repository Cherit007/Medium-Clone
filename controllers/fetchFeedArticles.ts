
export const fetchFeedArticles = async () => {
  try {
    const data = await fetch("http://localhost:3000/api/feed-articles", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const response = await data.json();
    console.log(response, "ddd");
  } catch (e) {
    console.log(e);
  }
};
