import { btnClassName } from "@/components/Button";
import RecordingList from "@/components/RecordingList";
import Link from "next/link";
import React from "react";

const MeetingEndScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has ended</p>

      <Link href="/" className={btnClassName}>
        Go home
      </Link>

      <div className="space-y-3">
        <h2 className="text-center text-xl font-bold">Recordings</h2>
        <RecordingList />
      </div>
    </div>
  );
};

export default MeetingEndScreen;
