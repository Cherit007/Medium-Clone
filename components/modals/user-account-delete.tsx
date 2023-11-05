import { database } from "@/appwriteConfig";
import useArticleStore from "@/store/useArticleStore";
import { useClerk } from "@clerk/nextjs";
import { DialogClose } from "@radix-ui/react-dialog";
import axios from "axios";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";

export default function UserAccountDeleteModal() {
  const [setLoading, data, isOpen, type, onClose, loading] =
    useArticleStore((state) => [
      state.setLoading,
      state.data,
      state.isOpen,
      state.type,
      state.onClose,
      state.loading,
    ]);
  const { signOut } = useClerk();

  const [userInput, setUserInput] = useState<string>("");
  const router = useRouter();
  const isModalOpen = type === "userAccountDelete" && isOpen;
  const handleUserDelete = async ($id: string, userId: string) => {
    try {
      if ($id && userId) {
        setLoading(true);
        await axios.post("/api/user/delete", {
          userId: userId,
        });
        await database.deleteDocument(
          "651d2c31d4f6223e24e2",
          "65219b9e7c62b9078824",
          $id as string
        );
        window.location.href="/"
        signOut();
        onClose();
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Dialog open={isModalOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white">
        <DialogHeader>
          <DialogTitle className="text-center mb-5">Delete account</DialogTitle>
          <div className="space-y-5">
            <DialogDescription className="text-center">
              We’re sorry to see you go. Once your account is deleted, all of
              your content will be permanently gone, including your profile and
              articles.
            </DialogDescription>
            <DialogDescription className="text-center">
              To confirm deletion, type “delete” below:
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className="text-center space-x-5 mt-2">
          <Input
            type="text"
            onChange={(e) => setUserInput(e.target.value)}
            placeholder="Enter delete"
            className="mb-5  border-b-2 border-[#6B6B6B]"
          />
          <Button
            onClick={() => onClose()}
            variant="outline"
            className="rounded-[20px]"
          >
            Cancel
          </Button>
          <Button
            onClick={() =>
              handleUserDelete(data?.$id as string, data?.userId as string)
            }
            disabled={userInput !== "delete"}
            variant="outline"
            className="bg-[#C94A4A] text-white rounded-[20px] hover:bg-[#C94A4A] hover:text-white"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin mr-3" />}
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
