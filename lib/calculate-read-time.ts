export const calculateArticleReadTime = (text: string) => {
  if (text) {
    const words = text.split(" ");
    const totalTime = Math.ceil(words.length / 120);
    return totalTime > 1 ? totalTime + " mins" : totalTime + " min";
  }
};
