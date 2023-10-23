export const calculateArticleReadTime = (text: string) => {
  const words = text.split(" ");
  const totalTime = Math.ceil((words.length * 4) / 60);
  return totalTime > 1 ? totalTime + " mins" : totalTime + " min";
};
