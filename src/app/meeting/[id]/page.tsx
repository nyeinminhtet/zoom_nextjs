import React from "react";
import { Metadata } from "next";

import MeetingPage from "./_components/MeetingPage";
import { currentUser } from "@clerk/nextjs/server";
import MeetingLogin from "./_components/MeetingLogin";

interface PageProps {
  params: {
    id: string;
  };
  searchParams: {
    guest: string;
  };
}

export const generateMetadata = ({ params: { id } }: PageProps): Metadata => {
  return {
    title: `Meeting ${id}`,
  };
};

const page = async ({ params: { id }, searchParams: { guest } }: PageProps) => {
  const user = await currentUser();

  const guestMode = guest === "true";

  if (!user && !guestMode) {
    return <MeetingLogin />;
  }
  return <MeetingPage id={id} />;
};

export default page;
