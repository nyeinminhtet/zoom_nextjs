import { useCallStateHooks } from "@stream-io/video-react-sdk";
import React from "react";
import MeetingEndScreen from "./MeetingEndScreen";
import UpcomingMeetingScreen from "./UpcomingMeetingScreen";

const MeetingScreen = () => {
  const { useCallEndedAt, useCallStartedAt } = useCallStateHooks();

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

  return <div>MeetingScreen</div>;
};

export default MeetingScreen;
