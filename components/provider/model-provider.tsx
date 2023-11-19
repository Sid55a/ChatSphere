"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../models/create-server-modal";
import { InviteModal } from "../models/invite-modal";
import { EditServerModal } from "../models/edit-server";
import { MemberModal } from "../models/member-modal";
import { CreateChannelModal } from "../models/create-channel-modal";
import { LeaveServerModal } from "../models/leaveServermodal";
import { DeleteServerModal } from "../models/deleteServerModal";
import { DeleteChannelModal } from "../models/deleteChannelModal";
import { EditChannelModal } from "../models/edit-channel-modal";
import { MessageFileModel } from "../models/messageFileModal";
import { DeleteMessageModal } from "../models/deleteMessageModal";

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
      <DeleteMessageModal/>
    </>
  );
};
