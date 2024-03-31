import React from "react";

import { useUser } from "@clerk/nextjs";

import useStreamCall from "@/hooks/useStreamCall";
import useLoadRecordings from "@/hooks/useLoadRecordings";
import { Loader2 } from "lucide-react";
import Link from "next/link";

const RecordingList = () => {
  const call = useStreamCall();

  const { recordingLoading, recordings } = useLoadRecordings(call);

  const { user, isLoaded } = useUser();

  if (!user && isLoaded) {
    return <p>You must be logged in to view recordings.</p>;
  }

  if (recordingLoading) {
    return <Loader2 className="mx-auto animate-spin" />;
  }

  return (
    <div className="space-y-3 text-center">
      {recordings.length === 0 && <p>No recordings for this meeting.</p>}

      <ul className="list-inside list-disc">
        {recordings
          .sort((a, b) => b.end_time.localeCompare(a.end_time))
          .map((recording) => (
            <li key={recording.url}>
              <Link
                href={recording.url}
                target="_blank"
                className="hover:underline"
              >
                {new Date(recording.end_time).toLocaleString()}
              </Link>
            </li>
          ))}
      </ul>

      <p className="text-sm text-gray-500">
        Note:It can take up to 1 minute before new recordings show up.
        <br />
        You can refresh the page to see if new recordings are available.
      </p>
    </div>
  );
};

export default RecordingList;
