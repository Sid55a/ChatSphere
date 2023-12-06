"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import axios from "axios";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import FileUpload from "../file-upload";
import { redirect, useRouter } from "next/navigation";
import { useModal } from "@/hooks/use-model-store";
import { MusicPlayer } from "../aiComponents/musicPlayer";
import { cn } from "@/lib/utils";
import { ScrollArea } from "../ui/scroll-area";

const formSchema = z.object({
  name: z.string().min(1, { message: "Music name is required" }),
});

export const AiChatSummModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, aiChatResult, type } = useModal();
  const isModelOpen = isOpen && type === "aiChatSumm";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent className={"bg-white text-black pb-6 overflow-hidden "}>
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Chat Summary
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              {aiChatResult && (
                <ScrollArea>
                  <div className="bg-yellow-50 py-2 px-3 rounded-sm text-justify">
                    {aiChatResult}
                  </div>
                </ScrollArea>
              )}
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
