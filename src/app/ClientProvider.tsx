"use client";

import React, { ReactNode, useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import {
  StreamVideo,
  StreamVideoClient,
  User,
} from "@stream-io/video-react-sdk";
import { Loader2 } from "lucide-react";
import { nanoid } from "nanoid";
import { getToken } from "./actions";

interface ClientProviderProps {
  children: ReactNode;
}

const ClientProvider = ({ children }: ClientProviderProps) => {
  const videoClient = useIntializeVideoClient();

  if (!videoClient) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="mx-auto animate-spin" />
      </div>
    );
  }
  return <StreamVideo client={videoClient}>{children}</StreamVideo>;
};

function useIntializeVideoClient() {
  const { user, isLoaded: userLoad } = useUser();
  const [videoClient, setVideoClient] = useState<StreamVideoClient | null>(
    null,
  );

  useEffect(() => {
    if (!userLoad) return;

    let streamUser: User;

    if (user?.id) {
      streamUser = {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl,
      };
    } else {
      const id = nanoid();
      streamUser = {
        id,
        name: `Guest ${id}`,
        type: "guest",
      };
    }

    const apiKey = process.env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY!;

    if (!apiKey) {
      throw new Error("Api Key is not set");
    }

    const client = new StreamVideoClient({
      apiKey,
      user: streamUser,
      tokenProvider: user?.id ? getToken : undefined,
    });

    setVideoClient(client);

    return () => {
      client.disconnectUser();
      setVideoClient(null);
    };
  }, [user?.id, user?.username, user?.imageUrl, userLoad]);

  return videoClient;
}

export default ClientProvider;
