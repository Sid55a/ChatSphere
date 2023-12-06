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
import Image from "next/image";
import * as fs from "fs";
const formSchema = z.object({
  name: z.string().min(1, { message: "Music name is required" }),
});

export const PdfChatModel = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen, type } = useModal();
  const isModelOpen = isOpen && type === "pdfChat";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [link, setLink] = useState("");
  const { musicUri, mLink, aiImageResult, setAiImageResult } = useModal();

  async function query(data: any) {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/HuggingFaceH4/zephyr-7b-beta",
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
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      query({"inputs": "Can you please let us know more details about your "}).then((response) => {
        console.log(JSON.stringify(response));
      });

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  const isLoading = form.formState.isSubmitting;

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={onClose}>
        <DialogContent
          className={cn("bg-white text-black pb-6 overflow-hidden ")}
        >
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Suggested Song For You
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500 flex flex-col">
              <p>
                By analysing your chat with the current user your suggested song
                and mood details
                <span className="font-semibold text-green-500"> Spotify </span>
                support.
              </p>
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
              <div className="space-y-8  px-6 flex justify-between items-center">
                <div className="basis-4/5 ">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="uppercase text-xs font-bold text-zinc-500 dark:text-secondary/70">
                          Give Image details
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                            placeholder="Enter details"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button
                  className="ml-auto basis-1/5 text-black dark:text-white font-semibold"
                  variant="primary"
                  disabled={isLoading}
                >
                  Search
                </Button>
              </div>
            </form>
          </Form>
          {aiImageResult && (
            <Image
              src={aiImageResult}
              height={50}
              width={30}
              alt="Ai generated Image"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};
