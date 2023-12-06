"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Bot,
  BrainCircuit,
  Cloud,
  CreditCard,
  Dices,
  File,
  Github,
  Image,
  Keyboard,
  Laugh,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  Music,
  PartyPopper,
  Plus,
  PlusCircle,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";
import ActionTooltip from "../action-tooltip";
import { Button } from "../ui/button";
import { DropdownMenuGroup } from "@radix-ui/react-dropdown-menu";
import { useModal } from "@/hooks/use-model-store";

export const ToolButton = () => {
  const { onOpen } = useModal();
  return (
    <>
      <DropdownMenu>
        <ActionTooltip lable="Entertainment Zone" align="start" side="right">
          <DropdownMenuTrigger className="flex items-center justify-center py-1 px-2 dark:bg-zinc-700 bg-zinc-50 hover:bg-zinc-100 font-semibold dark:hover:bg-zinc-800  rounded-full">
            <Dices className="h-7 w-7 p-1" />
          </DropdownMenuTrigger>
        </ActionTooltip>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuLabel>
            <p className="flex font-semibold items-center justify-center text-zinc-800 dark:text-white">
              Enjoy
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => onOpen("musicSelector")}
            className="dark:text-zinc-300 dark:hover:text-white "
          >
            <p className="flex w-full">
              Music <Music className="w-6 h-6 ml-auto" />
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => onOpen("imageGeneration")}
            className="dark:text-zinc-300 dark:hover:text-white "
          >
            <p className="flex w-full gap-1">
              Image Generation <Image className="w-6 h-6 ml-auto " />
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem
            onClick={() => onOpen("jokeModel")}
            className="dark:text-zinc-300 dark:hover:text-white "
          >
            <p className="flex w-full gap-1">
              Random Joke <Laugh className="w-6 h-6 ml-auto " />
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem className="dark:text-zinc-300 dark:hover:text-white ">
            <p className="flex w-full">More...</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DropdownMenu>
        <ActionTooltip lable="Ai Tools" align="start" side="right">
          <DropdownMenuTrigger className="flex items-center justify-center py-1 px-2 dark:bg-zinc-700 bg-zinc-50 hover:bg-zinc-100 font-semibold dark:hover:bg-zinc-800  rounded-full">
            <BrainCircuit className="h-7 w-7 p-1" />
          </DropdownMenuTrigger>
        </ActionTooltip>
        <DropdownMenuContent side="right" align="start">
          <DropdownMenuLabel>
            <p className="flex font-semibold items-center justify-center text-zinc-800 dark:text-white">
              Ai Tools
            </p>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="dark:text-zinc-300 dark:hover:text-white "
            onClick={() => onOpen("askAnything")}
          >
            <p className="flex w-full justify-center items-center">
              Ask Anything <Bot className="w-6 h-6 ml-2 " />
            </p>
          </DropdownMenuItem>
          <DropdownMenuItem
            className="dark:text-zinc-300 dark:hover:text-white "
            onClick={() => onOpen("pdfChat")}
          >
            <p className="flex w-full justify-center items-center">
              PDF Chat <File className="w-6 h-6 ml-2  ml-auto" />
            </p>
          </DropdownMenuItem>

          <DropdownMenuItem className="dark:text-zinc-300 dark:hover:text-white ">
            <p className="flex w-full ">More...</p>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
