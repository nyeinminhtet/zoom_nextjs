import { Call } from "@stream-io/video-react-sdk";

interface MeetingLinkProps {
  call: Call;
}

export default function MeetingLink({ call }: MeetingLinkProps) {
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${call.id}`;

  return <div className="text-center">{meetingLink}</div>;
}
