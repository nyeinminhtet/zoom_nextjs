import { useUser } from "@clerk/nextjs";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";

export default function useLoadRecordings(call: Call) {
  const { user } = useUser();

  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  const [recordingLoading, setRecordingLoading] = useState(true);

  useEffect(() => {
    async function loadRecording() {
      setRecordingLoading(true);

      if (!user?.id) return;
      const { recordings } = await call.queryRecordings();
      setRecordings(recordings);

      setRecordingLoading(false);
    }

    loadRecording();
  }, [call, user?.id]);

  return { recordingLoading, recordings };
}
