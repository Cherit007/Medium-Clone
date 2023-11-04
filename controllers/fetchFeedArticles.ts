export const fetchFeedArticles = async () => {
  try {
    const url =
      process.env.NEXT_PROD_MODE === "true"
        ? process.env.NEXT_PUBLIC_FRONT_END_URL
        : "http://localhost:3000";
    const data = await fetch(`${url}/api/feed-articles`, {
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
