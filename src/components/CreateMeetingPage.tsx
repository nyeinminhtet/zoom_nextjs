"use client";

import React, { useState } from "react";

import { useUser } from "@clerk/nextjs";

import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";

import DescriptionInput from "./DescriptionInput";
import StartTimeInput from "./StartTimeInput";
import ParticipantsInput from "./ParticipantsInput";
import MeetingLink from "./MeetingLink";

export default function CreateMeetingPage() {
  const [description, setDescription] = useState("");
  const [startTimeInput, setStartTimeInput] = useState("");
  const [participant, setParticipant] = useState("");
  const [loading, setLoading] = useState(false);

  const [call, setCall] = useState<Call>();

  const { user } = useUser();
  const client = useStreamVideoClient();

  async function createMeeting() {
    if (!client || !user) return;
    setLoading(true);
    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);

      await call.getOrCreate({
        data: {
          custom: { description: description },
        },
      });
      setCall(call);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  if (!user || !client) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  return (
    <div className="flex flex-col items-center space-y-6">
      <h1 className="text-center text-2xl font-bold">
        Welcome {user.username}
      </h1>

      <div className="mx-auto w-80 space-y-6 rounded-md bg-slate-100 p-5">
        <h2 className="text-xl font-bold">Create a new Meeting</h2>
        <DescriptionInput value={description} onChange={setDescription} />

        <StartTimeInput value={startTimeInput} onChange={setStartTimeInput} />

        <ParticipantsInput value={participant} onChange={setParticipant} />

        <button
          onClick={createMeeting}
          className="mx-auto flex items-center justify-center gap-x-2 rounded-lg bg-blue-500 p-3 text-white"
        >
          Create Meeting{" "}
          {loading && <Loader2 className="animate-spin text-gray-300" />}
        </button>
      </div>

      {call && <MeetingLink call={call} />}
    </div>
  );
}
