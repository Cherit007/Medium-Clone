import { create } from "zustand";

const useArticleStore = create<ArticleState>((set) => ({
  title: "",
  description: "",
  topic: "",
  currentArticle: undefined,
  setCurrentArticle: (currentArticle) => {
    set({ currentArticle });
  },
  recommendedArticles: [],
  setRecommendedArticle: (recommendedArticles) => {
    set({ recommendedArticles });
  },
  savedArticle: [],
  setSavedArticle: (savedArticle) => {
    set({ savedArticle });
  },
  loading: false,
  setLoading: (loading) => {
    set({ loading });
  },
  titleValidation: false,
  setTitleValidation: (titleValidation) => {
    set({ titleValidation });
  },
  setTopic: (topic) => {
    set({ topic });
  },
  setTitle: (title) => {
    set({ title });
  },
  setDescription: (description) => {
    set({ description });
  },
  imgUrl: undefined,
  setImgUrl: (imgUrl) => {
    set({ imgUrl });
  },
  setPublish: (values: ArticleProps) => {
    console.log(values);
  },
  userArticles: null,
  setUserArticles: (userArticles) => {
    set({ userArticles });
  },
  recommendedTags: [],
  setRecommendedTags: (recommendedTags) => {
    set({ recommendedTags });
  },
  img: null,
  setImg: (img) => {
    set({ img });
  },
  data: undefined,
  type: null,
  isOpen: false,
  onClose: () => set({ type: null, isOpen: false }),
  onOpen: (type, data = undefined) =>
    set({ isOpen: true, type, data }),
}));
export default useArticleStore;
