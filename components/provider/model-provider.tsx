"use client";

import { useEffect, useState } from "react";
import { AiAskAnythingModel } from "../models/aiAskAnythingModal";
import { AiChatSummModel } from "../models/aiChatSummModal";
import { AiImageGeneratorModel } from "../models/aiImageGeneratorModal";
import { AiInChatAnalyChatModel } from "../models/aiInChatAnalyChatModal";
import { AiMusicSearchModel } from "../models/aiMusicSearchModal";
import { AiVoiceModel } from "../models/aiVoiceModal";
import { CreateChannelModal } from "../models/create-channel-modal";
import { CreateServerModal } from "../models/create-server-modal";
import { DeleteChannelModal } from "../models/deleteChannelModal";
import { DeleteMessageModal } from "../models/deleteMessageModal";
import { DeleteServerModal } from "../models/deleteServerModal";
import { EditChannelModal } from "../models/edit-channel-modal";
import { EditServerModal } from "../models/edit-server";
import { InviteModal } from "../models/invite-modal";
import { LeaveServerModal } from "../models/leaveServermodal";
import { MemberModal } from "../models/member-modal";
import { MessageFileModel } from "../models/messageFileModal";
import { MusicSearchModel } from "../models/musicSearchModal";
import { PaymentModel } from "../models/paymentModal";
import { PdfChatModel } from "../models/pdfScanAndChatModal";
import { JokeModel } from "../models/jokeModal";

export const ModelProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <>
      <CreateServerModal />
      <InviteModal />
      <EditServerModal />
      <MemberModal />
      <CreateChannelModal />
      <LeaveServerModal />
      <DeleteServerModal />
      <DeleteChannelModal />
      <EditChannelModal />
      <MessageFileModel />
      <DeleteMessageModal />
      <MusicSearchModel />
      <AiMusicSearchModel />
      <AiChatSummModel />
      <AiImageGeneratorModel />
      <AiAskAnythingModel />
      <AiInChatAnalyChatModel />
      <AiVoiceModel />
      <PaymentModel />
      <PdfChatModel />
      <JokeModel />
    </>
  );
};
