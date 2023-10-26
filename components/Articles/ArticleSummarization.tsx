"use client";
import useArticleStore from "@/store/useArticleStore";
import axios from "axios";
import { Loader2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";

function ArticleSummarization() {
  const [currentArticle] = useArticleStore((state) => [state.currentArticle]);
  const [summarizedData, setSummarizedData] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const handleArticleSummarize = async () => {
    if (
      currentArticle?.description &&
      currentArticle?.description.length >= 250
    ) {
      setLoading(true);
      const payload = { text_to_summarize: currentArticle?.description };
      const { data } = await axios.post("/api/summarize-ai", payload);
      setSummarizedData(data?.data?.summarized_text);
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col bg-[#F2F2F2] rounded-[20px] p-4 gap-y-2 items-center min-h-[200px] overflow-auto justify-between">
      <div className="flex items-center gap-x-3">
        <img src="/aibrain.gif" className="w-10 h-10 rounded-[20px] mx-auto" />
        <h2 className="font-semibold text-center"> AI Article Summarization</h2>
      </div>
      {loading ? (
        <div className="text-center space-y-5">
          <p> Summarizing your article,Please wait for a moment...</p>
          <img src="/ai.gif" className="w-20 h-20 rounded-[20px] mx-auto" />
        </div>
      ) : summarizedData ? (
        <p>{summarizedData}</p>
      ) : (
        <ul className="text-sm space-y-4 list-disc">
          <li>
            This tool provides a concise summary of the article's key points.
          </li>
          <li>
            For the best results, make sure the article is well-structured and
            free of unnecessary information.
          </li>
        </ul>
      )}
      {!summarizedData && (
        <Button
          onClick={handleArticleSummarize}
          variant="outline"
          className="rounded-[10px] w-[50%]"
          disabled={loading}
        >
          {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          Summarize
        </Button>
      )}
    </div>
  );
}

export default ArticleSummarization;
