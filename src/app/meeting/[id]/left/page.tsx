import { btnClassName } from "@/components/Button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface Props {
  params: {
    id: string;
  };
}

const LeftPage = ({ params: { id } }: Props) => {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="font-bold">You left this meeting.</p>
      <Link
        href={`/meeting/${id}`}
        className={cn(btnClassName, "bg-gray-500 hover:bg-gray-600")}
      >
        Re-Join meeting
      </Link>
    </div>
  );
};

export default LeftPage;
