import { btnClassName } from "@/components/Button";
import Link from "next/link";
import React from "react";

const MeetingEndScreen = () => {
  return (
    <div className="flex flex-col items-center gap-6">
      <p className="font-bold">This meeting has ended</p>

      <Link href="/" className={btnClassName}>
        Go home
      </Link>
    </div>
  );
};

export default MeetingEndScreen;
