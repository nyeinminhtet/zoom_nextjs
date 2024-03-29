import { useEffect, useState } from "react";
import Link from "next/link";

import { Call } from "@stream-io/video-react-sdk";
import { CheckCheck, Copy } from "lucide-react";
import { getMailToLink } from "@/lib/getMailToLink";

interface MeetingLinkProps {
  call: Call;
}

export default function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const time = setTimeout(() => {
      setCopied(false);
    }, 1000);

    return () => clearTimeout(time);
  }, [copied]);

  return (
    <div className="flex flex-col items-center gap-3 text-center">
      <div className="flex items-center gap-3">
        <span>
          Invitation link{" "}
          <Link href={meetingLink} className="font-medium">
            {meetingLink}
          </Link>
        </span>

        {copied ? (
          <CheckCheck className="text-green-500" />
        ) : (
          <button
            title="Copy Invitation link"
            onClick={() => {
              navigator.clipboard.writeText(meetingLink);
              setCopied(true);
            }}
          >
            <Copy />
          </button>
        )}
      </div>

      <a
        href={getMailToLink(
          meetingLink,
          call.state.startsAt,
          call.state.custom.description,
        )}
        className="text-blue-500 hover:underline"
        target="_blank"
      >
        Send email invitation
      </a>
    </div>
  );
}
