"use client";

import React, { useState } from "react";

import {
  Call,
  CallControls,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  useStreamVideoClient,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { useLoadCall } from "@/hooks/useLoadCall";
import { useUser } from "@clerk/nextjs";
import MeetingScreen from "./MeetingScreen";

interface MeetingPageProps {
  id: string;
}

const MeetingPage = ({ id }: MeetingPageProps) => {
  const { call, callLoading } = useLoadCall(id);
  const { user, isLoaded: userLoading } = useUser();

  if (!userLoading || callLoading) {
    return <Loader2 className="animate-spin" />;
  }

  if (!call) {
    return <p className="text-center font-bold">Call not found</p>;
  }

  const notAllowedToJoin =
    call.type === "private-meeting" &&
    (!user || !call.state.members.find((m) => m.user.id === user.id));

  if (notAllowedToJoin) {
    return (
      <p className="text-center font-bold">
        You are not allowed to view this metting
      </p>
    );
  }

  return (
    <StreamCall call={call}>
      <StreamTheme>
        <MeetingScreen />
      </StreamTheme>
    </StreamCall>
  );
};

export default MeetingPage;
