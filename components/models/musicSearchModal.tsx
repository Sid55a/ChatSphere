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

const formSchema = z.object({
  name: z.string().min(1, { message: "Music name is required" }),
});

export const MusicSearchModel = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const { isOpen, onClose, onOpen, type } = useModal();
  const isModelOpen = isOpen && type === "musicSelector";

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [result, setResult] = useState("");
  useEffect(() => {}, [result]);
  const { musicUri, mLink, setCurrEMode } = useModal();
  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "POST",
        url: "https://open-ai21.p.rapidapi.com/conversationgpt",
        headers: {
          "content-type": "application/json",
          "X-RapidAPI-Key":
            "48289017cfmsh9f5c693c21d13dcp1171c9jsn6e32b24e1125",
          "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
        },
        data: {
          messages: [
            {
              role: "user",
              content: "Give me one random hindi song released after year 1999",
            },
          ],
          web_access: false,
        },
      });
      console.log(response?.data.result);
      setResult(response?.data?.result);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setLoading(true);
      const response = await axios.request({
        method: "GET",
        url: "https://spotify81.p.rapidapi.com/search",
        params: {
          q: values?.name,
          type: "multi",
          offset: "0",
          limit: "10",
          numberOfTopResults: "5",
        },
        headers: {
          "X-RapidAPI-Key":
            "9fec0e4972msh21218c90552c659p1e4ff6jsnb84108350498",
          "X-RapidAPI-Host": "spotify81.p.rapidapi.com",
        },
      });

      const track = response?.data.tracks[0].data.uri.split(":")[2];

      form.reset();
      console.log("Api call");
      // setLink(track);
      setCurrEMode(1);
      musicUri(track);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
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
          className={cn(
            "bg-white text-black pb-6 overflow-hidden ",
            mLink && "p-0"
          )}
        >
          <DialogHeader className="pt-8 px-6">
            <DialogTitle className="text-2xl text-center font-bold">
              Search Any Song
            </DialogTitle>
            <DialogDescription className="text-center text-zinc-500">
              Search any song by name/album/artist/gener and enjoy seamless
              music with{" "}
              <span className="font-semibold text-green-500"> Spotify </span>
              support.
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
                          Search Song
                        </FormLabel>
                        <FormControl>
                          <Input
                            disabled={isLoading}
                            className="bg-zinc-300/50 border-0 focus-visible:ring-0 text-black focus-visible:ring-offset-0 "
                            placeholder="Enter song"
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
              <div className="flex justify-center items-center  flex-col ">
                {loading ? (
                  <div className=" text-sm text-red-400 hover:text-red-600 cursor-pointer mb-2">
                    Searching song for you...
                  </div>
                ) : (
                  <div
                    className=" text-sm text-red-400 hover:text-red-600 cursor-pointer mb-2"
                    onClick={handleClick}
                  >
                    Play random song...
                  </div>
                )}
                <p className="py-2 px-3 rounded-sm bg-yellow-50">{result}</p>
              </div>
            </form>
          </Form>
          {mLink && <MusicPlayer />}
        </DialogContent>
      </Dialog>
    </>
  );
};
