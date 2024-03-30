import useStreamCall from "@/hooks/useStreamCall";
import {
  DeviceSettings,
  useCallStateHooks,
  VideoPreview,
} from "@stream-io/video-react-sdk";
import React, { useEffect, useState } from "react";
import PermissionUI from "./PermissionUI";
import Button from "@/components/Button";
import AudioVolumeIndicator from "@/components/AudioVolumeIndicator";

interface SetUpUIProps {
  onSetupComplete: () => void;
}

const SetUpUI = ({ onSetupComplete }: SetUpUIProps) => {
  const call = useStreamCall();

  const { useCameraState, useMicrophoneState } = useCallStateHooks();

  const [micCamDisable, setMicCamDisable] = useState(false);

  const micState = useMicrophoneState();
  const cameraState = useCameraState();

  if (!micState.hasBrowserPermission || !cameraState.hasBrowserPermission) {
    return <PermissionUI />;
  }

  useEffect(() => {
    if (micCamDisable) {
      call.microphone.disable();
      call.camera.disable();
    } else {
      call.microphone.enable();
      call.camera.enable();
    }
  }, [micCamDisable, call]);

  return (
    <div className="flex flex-col items-center gap-3">
      <h1 className="text-center text-2xl font-bold">SetUp</h1>

      <VideoPreview />

      <div className="flex h-16 items-center gap-3">
        <AudioVolumeIndicator />
        <DeviceSettings />
      </div>

      <label className="flex items-center gap-2 font-medium">
        <input
          type="checkbox"
          checked={micCamDisable}
          onChange={(e) => setMicCamDisable(e.target.checked)}
        />
        Join with mic and camera off
      </label>

      <Button onClick={onSetupComplete}>Join Meeting</Button>
    </div>
  );
};

export default SetUpUI;
