import { Channel, ChannelType, Profile, Server } from "@prisma/client";
import { type } from "os";
import { create } from "zustand";

export type ModalType =
  | "createServer"
  | "invite"
  | "editServer"
  | "members"
  | "createChannel"
  | "leaveServer"
  | "deleteServer"
  | "deleteChannel"
  | "editChannel"
  | "messageFile"
  | "deleteMessage"
  | "musicSelector"
  | "aiMusicSugg"
  | "aiChatSumm"
  | "imageGeneration"
  | "askAnything"
  | "aiInChatAsk"
  | "aiTextToVoice"
  | "payment"
  | "pdfChat"
  | "jokeModel";
interface ModalData {
  server?: Server;
  channel?: Channel;
  channelType?: ChannelType;
  apiUrl?: string;
  query?: Record<string, any>;
  uri?: string;
  musicAiQ?: string;
  aiMusicSugg?: string;
  aiChatSugg?: string;
  aiImageUrl?: string;
  aiAskResponse?: string;
  aiRawQuery?: string;
  me?: Profile;
  other?: Profile;
}

interface ModalStore {
  type: ModalType | null;
  isOpen: boolean;
  data: ModalData;
  mLink: string;
  mAiQ: string;
  aiMusicCom: string;
  aiChatResult: string;
  aiImageResult: string;
  aiAskResult: string;
  rawQuery: string;
  fnqResult: string;
  aiVoiceLink: string;
  quote: string;
  currEMode: number;
  setCurrEMode: (em: number) => void;
  setQuote: (q: string) => void;
  setAiAskResult: (aiAskResponse: string) => void;
  setAiChatSugg: (aiSugg: string) => void;
  setmAiQ: (q: string) => void;
  onOpen: (type: ModalType, data?: ModalData) => void;
  onClose: () => void;
  musicUri: (uri: string) => void;
  setAiMusicSugg: (aiMusicSugg: any) => void;
  setAiImageResult: (aiImageUrl: string) => void;
  setRawQuery: (aiRawQuery: string) => void;
  setFnqResult: (fnq: string) => void;
  setAiVoiceLink: (link: string) => void;
}

export const useModal = create<ModalStore>((set) => ({
  type: null,
  data: {},
  mLink: "",
  isOpen: false,
  mAiQ: "",
  aiChatResult: "",
  aiMusicCom: "",
  aiImageResult: "",
  aiAskResult: "",
  rawQuery: "",
  fnqResult: "",
  aiVoiceLink: "",
  quote: "",
  currEMode: 1,
  setCurrEMode: (em) => set({ currEMode: em }),
  setQuote: (q) => set({ quote: q }),
  setAiVoiceLink: (link) => set({ aiVoiceLink: link }),
  setFnqResult: (fnq) => set({ fnqResult: fnq }),
  setRawQuery: (aiRawQuery) => set({ rawQuery: aiRawQuery }),
  setAiAskResult: (aiAskResponse) => set({ aiAskResult: aiAskResponse }),
  setAiImageResult: (aiImageUrl) => set({ aiImageResult: aiImageUrl }),
  setAiMusicSugg: (aiMusicSugg) => set({ aiMusicCom: aiMusicSugg }),
  setAiChatSugg: (aiChatSugg) => set({ aiChatResult: aiChatSugg }),
  setmAiQ: (uri) => set({ mAiQ: uri }),
  onOpen: (type, data = {}) => set({ isOpen: true, type, data }),
  onClose: () => set({ type: null, isOpen: false }),
  musicUri: (uri) => set({ mLink: uri }),
}));
