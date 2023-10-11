type EventTypePayload = {
    data: Record<any, string | number>;
    object: "event";
    type: EventType;
  };
  
  interface NavbarProps {
    buttonText: string;
    status: "writeArticle" | "navbar";
  }
  
  interface ArticleState {
    title: string;
    setTitle: (title) => void;
    topic: string;
    setTopic: (topic) => void;
    description: string;
    setDescription: (description) => void;
    setPublish: (title) => void;
    type: ModalType | null;
    data: {};
    isOpen: boolean;
    onOpen: (type: ModalType, data?: {}) => void;
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
  }
  
  interface ArticleProps {
    status?: string;
    title: string;
    description: string;
    topic: string;
    articleImgUrl?: string  | StaticImport;
    $createdAt:string;
    $id:string
  }
  
  interface EditedArticleProps {
    editedTitle?: string;
    editedDescription?: string;
    editedArticleImgUrl?: string  | StaticImport;
  }
  
  
  type ModalType = "writeArticle";
  