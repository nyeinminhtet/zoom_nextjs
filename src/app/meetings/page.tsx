import React from "react";
import { Metadata } from "next";
import MyMeetings from "./_componetns/MyMeetings";

export const metada: Metadata = {
  title: "My Meetings",
};

const page = () => {
  return <MyMeetings />;
};

export default page;
