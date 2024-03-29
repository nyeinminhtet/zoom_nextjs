import React from "react";
import { Metadata } from "next";

import MeetingPage from "./_components/MeetingPage";

interface PageProps {
  params: {
    id: string;
  };
}

export const generateMetadata = ({ params: { id } }: PageProps): Metadata => {
  return {
    title: `Meeting ${id}`,
  };
};

const page = ({ params: { id } }: PageProps) => {
  return <MeetingPage id={id} />;
};

export default page;
