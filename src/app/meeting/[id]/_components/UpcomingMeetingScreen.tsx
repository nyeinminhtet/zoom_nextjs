import { btnClassName } from "@/components/Button";
import useStreamCall from "@/hooks/useStreamCall";
import Link from "next/link";
import React from "react";

const UpcomingMeetingScreen = () => {
  const call = useStreamCall();

  return (
    <div className="flex flex-col items-center gap-6">
      <p>
        This meeting has not started yet. It will start at{" "}
        <span className="font-bold">
          {call.state.startedAt?.toLocaleString()}
        </span>
      </p>

      {call.state.custom.description && (
        <p>
          Description:{" "}
          <span className="font-bold">{call.state.custom.description}</span>
        </p>
      )}

      <Link href="/" className={btnClassName}>
        Go home
      </Link>
    </div>
  );
};

export default UpcomingMeetingScreen;
