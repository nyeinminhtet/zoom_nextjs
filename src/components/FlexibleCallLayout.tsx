import React, { useState } from "react";

import useStreamCall from "@/hooks/useStreamCall";
import {
  CallControls,
  PaginatedGridLayout,
  SpeakerLayout,
} from "@stream-io/video-react-sdk";
import CallLayoutButton from "./CallLayoutButton";
import EndCallButton from "./EndCallButton";
import { useRouter } from "next/navigation";

export type CallLayout = "speaker-vert" | "speaker-horiz" | "grid";

const FlexibleCallLayout = () => {
  const [layout, setLayout] = useState<CallLayout>("speaker-vert");

  const call = useStreamCall();

  const router = useRouter();

  return (
    <div className="space-y-3">
      <CallLayoutButton layout={layout} setLayout={setLayout} />
      <CallLayoutView layout={layout} />
      <CallControls onLeave={() => router.push(`/meeting/${call.id}/left`)} />
      <EndCallButton />
    </div>
  );
};

export default FlexibleCallLayout;

interface CallLayoutViewProps {
  layout: CallLayout;
}

function CallLayoutView({ layout }: CallLayoutViewProps) {
  if (layout === "speaker-vert") {
    return <SpeakerLayout />;
  }

  if (layout === "speaker-horiz") {
    return <SpeakerLayout participantsBarPosition="right" />;
  }

  if (layout === "grid") {
    return <PaginatedGridLayout />;
  }

  return null;
}
