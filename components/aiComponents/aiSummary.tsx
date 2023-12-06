"use client";

import { Bot, Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import axios from "axios";
import { useModal } from "@/hooks/use-model-store";
import ActionTooltip from "../action-tooltip";
import { useState } from "react";

export const AiSummary = (fm: { fm: string }) => {
  const { setAiChatSugg, onOpen } = useModal();
  const [loading, setLoading] = useState(false);

  async function query(data: any) {
    setLoading(true);
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-cnn",
      {
        headers: {
          Authorization: "Bearer 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",
        },
        method: "POST",
        body: JSON.stringify(data),
      }
    );
    const result = await response.json();
    return result;
  }

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/summary",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "48289017cfmsh9f5c693c21d13dcp1171c9jsn6e32b24e1125",
          "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
        },
        data: {
          text: fm.fm,
        },
      });
      console.log(response.data.result);
      setAiChatSugg(response?.data?.result);
      onOpen("aiChatSumm");
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // const handleClick = () => {
  //   query({
  //     inputs: fm.fm,
  //   }).then((response) => {
  //     setLoading(false);
  //     console.log(JSON.stringify(response));
  //   });
  // };
  return (
    <>
      <div className="px-2">
        <ActionTooltip lable="Ai Chat Summary">
          <Button
            onClick={handleClick}
            variant="ghost"
            size="icon"
            disabled={loading}
          >
            {loading ? (
              <Loader2 className="h-5 w-5 text-zinc-500 animate-spin my-4" />
            ) : (
              <Bot className="h-5 w-5" />
            )}
          </Button>
        </ActionTooltip>
      </div>
    </>
  );
};
