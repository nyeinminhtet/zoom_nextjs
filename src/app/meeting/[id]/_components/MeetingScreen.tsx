import React, { useState } from "react";
import { SpeakerLayout, useCallStateHooks } from "@stream-io/video-react-sdk";

import MeetingEndScreen from "./MeetingEndScreen";
import UpcomingMeetingScreen from "./UpcomingMeetingScreen";
import useStreamCall from "@/hooks/useStreamCall";
import SetUpUI from "./SetUpUI";

const MeetingScreen = () => {
  const { useCallEndedAt, useCallStartedAt } = useCallStateHooks();
  const call = useStreamCall();

  const [setUpComplete, setSetUpComplete] = useState(false);

  const callEndedAt = useCallEndedAt();
  const callStartAt = useCallStartedAt();

  const callIsInFuture = callStartAt && new Date(callStartAt) > new Date();

  const callHasEnd = !!callEndedAt;

  if (callHasEnd) {
    return <MeetingEndScreen />;
  }

  if (callIsInFuture) {
    return <UpcomingMeetingScreen />;
  }

  const description = call.state.custom.description;

  const handleSetUp = async () => {
    call.join();
    setSetUpComplete(true);
  };

  return (
    <div className="space-y-6">
      {description && (
        <p className="text-center">
          Meeting description: <span className="font-bold">{description}</span>
        </p>
      )}

      {setUpComplete ? (
        <SpeakerLayout />
      ) : (
        <SetUpUI onSetupComplete={handleSetUp} />
      )}
    </div>
  );
};

export default MeetingScreen;
