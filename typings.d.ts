type EventTypePayload = {
  data: Record<any, string | number>;
  object: "event";
  type: EventType;
};

interface NavbarProps {
  buttonText: string;
  status: "writeArticle" | "navbar";
}

interface ModalData {
  $id?: string;
  title?: string;
  userId?: string;
  name?: string;
}

interface ArticleState {
  title: string;
  setTitle: (title) => void;
  topic: string;
  setTopic: (topic) => void;
  description: string;
  setDescription: (description) => void;
  setPublish: (title) => void;
  type: ModalType | null | SheetType;
  data: ModalData | undefined;
  isOpen: boolean;
  onOpen: (type: ModalType | SheetType, data?: {}) => void;
  onClose: () => void;
  imgUrl: any;
  setImgUrl: (imgUrl) => void;
  img: any;
  setImg: (imgUrl) => void;
  userArticles: ArticleProps[] | null;
  setUserArticles: (userArticles) => void;
  loading: boolean;
  setLoading: (loading) => void;
  titleValidation: boolean;
  setTitleValidation: (titleValidation) => void;
  currentArticle: ArticleProps | undefined;
  setCurrentArticle: (currentArticle) => void;
  savedArticle: ArticleProps[] | [];
  setSavedArticle: (savedArticle) => void;
  recommendedTags: [];
  setRecommendedTags: (recommendedTags) => void;
  recommendedArticles: [];
  setRecommendedArticle: (recommendedTags) => void;
}

interface CommentProps {
  $createdAt: string;
  $id: string;
  articleId: string;
  comment: string;
  userId: string;
}

type ArticleCardType = "recommended" | "me" | "feed";

interface ArticleProps {
  status?: ArticleCardType;
  title: string;
  description: string;
  topic: string;
  articleImgUrl?: string | StaticImport;
  $createdAt: string;
  $id: string;
  audioUrl?: string;
  comments: CommentProps[];
  users: {
    name: string;
    profile_img_url: string;
    savedArticles?: string[] | [];
    $id: string;
  };
  articleRating:number;
  currentUser?: any;
  subTopics?: string[] | [];
  likes?: any;
  comment?: any;
}

interface EditedArticleProps {
  editedTitle?: string;
  editedDescription?: string;
  editedArticleImgUrl?: string | StaticImport;
  user: any;
}

interface UserTopics {
  selected: boolean;
  topic: string;
}
type ModalType =
  | "writeArticle"
  | "editWriteArticle"
  | "deleteArticle"
  | "userAccountDelete";

type SheetType = "commentArticle";

interface MembershipPlanFeatures {
  label: string;
}
