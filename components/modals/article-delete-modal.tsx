import { fetchArticles } from "@/controllers/fetchUserArticles";
import useArticleStore from "@/store/useArticleStore";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";

export default function ArticleDeleteModal() {
  const [setLoading, setUserArticles, data, isOpen, type, onClose, loading] =
    useArticleStore((state) => [
      state.setLoading,
      state.setUserArticles,
      state.data,
      state.isOpen,
      state.type,
      state.onClose,
      state.loading,
    ]);
  const isModalOpen = type === "deleteArticle" && isOpen;
  const handleArticleDelete = async ($id: string, title: string) => {
    try {
      setLoading(true);
      const payload = {
        id: $id,
        title: title,
      };
      await axios.post("/api/delete-article", payload);
      onClose();
      await fetchArticles(setLoading, setUserArticles);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog open={isModalOpen}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center">Delete Article</DialogTitle>
          <DialogDescription className="text-center">
            Deletion is not reversible, and the story will be completely
            deleted.
          </DialogDescription>
          <div className="text-center space-x-5">
            <DialogClose asChild>
              <Button variant="outline" className="rounded-[20px]">
                Cancel
              </Button>
            </DialogClose>
            <Button
              onClick={() =>
                handleArticleDelete(data?.$id || "", data?.title || "")
              }
              variant="outline"
              className="bg-[#C94A4A] text-white rounded-[20px] hover:bg-[#C94A4A] hover:text-white"
            >
              {loading && <Loader2 className="w-4 h-4 animate-spin mr-3" />}
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
